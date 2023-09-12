import fs from 'fs';
import { OpenAI } from 'openai';
import { QueryData, AzureOpenAIResponse, EmailSmsResponse, OpenAIHeadersBody, ChatGPTData } from './interfaces';
import fetch from 'cross-fetch';
import './config';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
const OPENAI_ENDPOINT = process.env.OPENAI_ENDPOINT as string;
const OPENAI_MODEL = process.env.OPENAI_MODEL as string;
const OPENAI_API_VERSION = process.env.OPENAI_API_VERSION as string;
const AZURE_COGNITIVE_SEARCH_ENDPOINT = process.env.AZURE_COGNITIVE_SEARCH_ENDPOINT as string;
const AZURE_COGNITIVE_SEARCH_KEY = process.env.AZURE_COGNITIVE_SEARCH_KEY as string;
const AZURE_COGNITIVE_SEARCH_INDEX = process.env.AZURE_COGNITIVE_SEARCH_INDEX as string;

async function getAzureOpenAICompletion(systemPrompt: string, userPrompt: string, temperature: number): Promise<string> {
    checkRequiredEnvVars(['OPENAI_API_KEY', 'OPENAI_ENDPOINT', 'OPENAI_MODEL']);

    const fetchUrl = `${OPENAI_ENDPOINT}/openai/deployments/${OPENAI_MODEL}/chat/completions?api-version=${OPENAI_API_VERSION}`;

    const messageData: ChatGPTData = {
        max_tokens: 1024,
        temperature,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ]
    };

    const headersBody: OpenAIHeadersBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': OPENAI_API_KEY
        },
        body: JSON.stringify(messageData),
    };

    const completion = await fetchAndParse(fetchUrl, headersBody);
    console.log(completion);

    let content = (completion.choices[0]?.message?.content?.trim() ?? '') as string;
    console.log('Azure OpenAI Output: \n', content);

    if (content && content.includes('{') && content.includes('}')) {
        content = extractJson(content);
    }

    console.log('After parse: \n', content);

    return content;
}

async function getAzureOpenAIBYODCompletion(systemPrompt: string, userPrompt: string, temperature: number): Promise<string> {
    checkRequiredEnvVars([ 
        'OPENAI_API_KEY',
        'OPENAI_ENDPOINT',
        'OPENAI_MODEL',
        'AZURE_COGNITIVE_SEARCH_ENDPOINT',
        'AZURE_COGNITIVE_SEARCH_KEY',
        'AZURE_COGNITIVE_SEARCH_INDEX',
    ]);

    const fetchUrl = `${OPENAI_ENDPOINT}/openai/deployments/${OPENAI_MODEL}/extensions/chat/completions?api-version=${OPENAI_API_VERSION}`;

    const messageData: ChatGPTData = {
        max_tokens: 1024,
        temperature,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        dataSources: [
            {
                type: 'AzureCognitiveSearch',
                parameters: {
                    endpoint: AZURE_COGNITIVE_SEARCH_ENDPOINT,
                    key: AZURE_COGNITIVE_SEARCH_KEY,
                    indexName: AZURE_COGNITIVE_SEARCH_INDEX
                }
            }
        ]
    };

    const headersBody: OpenAIHeadersBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': OPENAI_API_KEY,
            chatgpt_url: fetchUrl.replace('extensions/', ''),
            chatgpt_key: OPENAI_API_KEY
        },
        body: JSON.stringify(messageData),
    };

    const completion = await fetchAndParse(fetchUrl, headersBody);
    console.log(completion);

    if (completion.error) {
        console.error('Azure OpenAI BYOD Error: \n', completion.error);
        return completion.error.message;
    }

    const citations = (completion.choices[0]?.messages[0]?.content?.trim() ?? '') as string;
    console.log('Azure OpenAI BYOD Citations: \n', citations);

    let content = (completion.choices[0]?.messages[1]?.content?.trim() ?? '') as string;
    console.log('Azure OpenAI BYOD Output: \n', content);

    return content;
}

async function getOpenAICompletion(systemPrompt: string, userPrompt: string, temperature = 0): Promise<string> {
    await checkRequiredEnvVars(['OPENAI_API_KEY']);

    try {
        // v4+ OpenAI API. 
        // On v3? View the migration guide here: https://github.com/openai/openai-node/discussions/217
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-4
            max_tokens: 1024,
            temperature,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ]
        });

        let content = completion.choices[0]?.message?.content?.trim() ?? '';
        console.log('OpenAI Output: \n', content);
        if (content && content.includes('{') && content.includes('}')) {
            content = extractJson(content);
        }
        return content;
    }
    catch (e) {
        console.error('Error getting data:', e);
        throw e;
    }
}

function checkRequiredEnvVars(requiredEnvVars: string[]) {
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing ${envVar} in environment variables.`);
        }
    }
}

async function fetchAndParse(url: string, headersBody: Record<string, any>): Promise<any> {
    try {
        const response = await fetch(url, headersBody);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
    }
}

function callOpenAI(systemPrompt: string, userPrompt: string, temperature = 0, useBYOD = false) {
    const isAzureOpenAI = OPENAI_API_KEY && OPENAI_ENDPOINT && OPENAI_MODEL;

    if (isAzureOpenAI && useBYOD) {
        // Azure OpenAI + Cognitive Search: Bring Your Own Data
        return getAzureOpenAIBYODCompletion(systemPrompt, userPrompt, temperature);
    }

    if (isAzureOpenAI) {
        // Azure OpenAI
        return getAzureOpenAICompletion(systemPrompt, userPrompt, temperature);
    }

    // OpenAI
    return getOpenAICompletion(systemPrompt, userPrompt, temperature);
}

function extractJson(content: string) {
    const regex = /\{(?:[^{}]|{[^{}]*})*\}/g;
    const match = content.match(regex);

    if (match) {
        // If we get back pure text it can have invalid carriage returns
        return match[0].replace(/"([^"]*)"/g, (match) => match.replace(/\n/g, "\\n"));
    } else {
        return '';
    }
}

async function completeBYOD(userPrompt: string): Promise<string> {
    const systemPrompt = 'You are an AI assistant that helps people find information.';
    // Pass that we're using Cognitive Search along with Azure OpenAI.
    return await callOpenAI(systemPrompt, userPrompt, 0, true);
}

async function getSQLFromNLP(userPrompt: string): Promise<QueryData> {
    // Get the high-level database schema summary to be used in the prompt.
    // The db.schema file could be generated by a background process or the 
    // schema could be dynamically retrieved.
    const dbSchema = await fs.promises.readFile('db.schema', 'utf8');

    const systemPrompt = `
      Assistant is a natural language to SQL bot that returns only a JSON object with the SQL query and 
      the parameter values in it. The SQL will query a PostgreSQL database.
      
      PostgreSQL tables, with their columns:    
  
      ${dbSchema}
  
      Rules:
      - Convert any strings to a PostgreSQL parameterized query value to avoid SQL injection attacks.
      - Always return a JSON object with the SQL query and the parameter values in it.
      - Return a valid JSON object. Do NOT include any text outside of the JSON object.
      - Example JSON object to return: { "sql": "", "paramValues": [] }

      User: "Display all company reviews. Group by company."      
      Assistant: { "sql": "SELECT * FROM reviews", "paramValues": [] }

      User: "Display all reviews for companies located in cities that start with 'L'."
      Assistant: { "sql": "SELECT r.* FROM reviews r INNER JOIN customers c ON r.customer_id = c.id WHERE c.city LIKE 'L%'", "paramValues": [] }

      User: "Display revenue for companies located in London. Include the company name and city."
      Assistant: { 
        "sql": "SELECT c.company, c.city, SUM(o.total) AS revenue FROM customers c INNER JOIN orders o ON c.id = o.customer_id WHERE c.city = $1 GROUP BY c.company, c.city", 
        "paramValues": ["London"] 
      }

      User: "Get the total revenue for Adventure Works Cycles. Include the contact information as well."
      Assistant: { 
        "sql": "SELECT c.company, c.city, c.email, SUM(o.total) AS revenue FROM customers c INNER JOIN orders o ON c.id = o.customer_id WHERE c.company = $1 GROUP BY c.company, c.city, c.email", 
        "paramValues": ["Adventure Works Cycles"] 
      }

      - Convert any strings to a PostgreSQL parameterized query value to avoid SQL injection attacks.
      - Do NOT include any text outside of the JSON object. Do not provide any additional explanations or context. Just the JSON object is needed.
    `;

    let queryData: QueryData = { sql: '', paramValues: [], error: '' };
    let results = '';

    try {
        results = await callOpenAI(systemPrompt, userPrompt);
        if (results) {
            console.log('results', results);
            const parsedResults = JSON.parse(results);
            queryData = { ...queryData, ...parsedResults };
            if (isProhibitedQuery(queryData.sql)) {
                queryData.sql = '';
                queryData.error = 'Prohibited query.';
            }
        }
    } catch (error) {
        console.log(error);
        if (isProhibitedQuery(results)) {
            queryData.sql = '';
            queryData.error = 'Prohibited query.';
        } else {
            queryData.error = results;
        }
    }

    return queryData;
}

function isProhibitedQuery(query: string): boolean {
    if (!query) return false;

    const prohibitedKeywords = [
        'insert', 'update', 'delete', 'drop', 'truncate', 'alter', 'create', 'replace',
        'information_schema', 'pg_catalog', 'pg_tables', 'pg_namespace', 'pg_class',
        'table_schema', 'table_name', 'column_name', 'column_default', 'is_nullable',
        'data_type', 'udt_name', 'character_maximum_length', 'numeric_precision',
        'numeric_scale', 'datetime_precision', 'interval_type', 'collation_name',
        'grant', 'revoke', 'rollback', 'commit', 'savepoint', 'vacuum', 'analyze'
    ];
    const queryLower = query.toLowerCase();
    return prohibitedKeywords.some(keyword => queryLower.includes(keyword));
}

async function completeEmailSMSMessages(prompt: string, company: string, contactName: string) {
    console.log('Inputs:', prompt, company, contactName);

    const systemPrompt = `
      Assistant is a bot designed to help users create email and SMS messages from data and 
      return a JSON object with the email and SMS message information in it.

      Rules:
      - Generate a subject line for the email message.
      - Use the User Rules to generate the messages. 
      - All messages should have a friendly tone and never use inappropriate language.
      - SMS messages should be in plain text format and NO MORE than 160 characters. 
      - Start the message with "Hi <Contact Name>,\n\n". Contact Name can be found in the user prompt.
      - Add carriage returns to the email message to make it easier to read. 
      - End with a signature line that says "Sincerely,\nCustomer Service".
      - Return a valid JSON object with the emailSubject, emailBody, and SMS message values in it:

      { "emailSubject": "", "emailBody": "", "sms": "" }

      - The sms property value should be in plain text format and NO MORE than 160 characters. 
      - Only return a valid JSON object. Do NOT include any text outside of the JSON object. Do not provide any additional explanations or context. 
      Just the JSON object is needed.
    `;

    const userPrompt = `
      User Rules: 
      ${prompt}

      Contact Name: 
      ${contactName}
    `;

    let content: EmailSmsResponse = { status: true, email: '', sms: '', error: '' };
    let results = '';
    try {
        results = await callOpenAI(systemPrompt, userPrompt, 0.5);
        if (results) {
            const parsedResults = JSON.parse(results);
            content = { ...content, ...parsedResults, status: true };
        }
    }
    catch (e) {
        console.log(e);
        content.status = false;
        content.error = results;
    }

    return content;
}

export { completeBYOD, completeEmailSMSMessages, getSQLFromNLP as getSQL };