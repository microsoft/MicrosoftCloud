import fs from 'fs';
import { OpenAI, AzureOpenAI } from 'openai';
import { QueryData, EmailSmsResponse, AzureOpenAIYourDataResponse } from './interfaces';
import './config';

const {
    OPENAI_API_KEY,
    OPENAI_ENDPOINT,
    OPENAI_MODEL,
    OPENAI_API_VERSION,
    AZURE_AI_SEARCH_ENDPOINT,
    AZURE_AI_SEARCH_KEY,
    AZURE_AI_SEARCH_INDEX
} = process.env as Record<string, string>;

function callOpenAI(systemPrompt: string, userPrompt: string, temperature = 0, useBYOD = false) {
    const isAzureOpenAI = OPENAI_API_KEY && OPENAI_ENDPOINT && OPENAI_MODEL;

    if (isAzureOpenAI) {
        if (useBYOD) {
            return getAzureOpenAIBYODCompletion(systemPrompt, userPrompt, temperature);
        }
        return getAzureOpenAICompletion(systemPrompt, userPrompt, temperature);
    }

    return getOpenAICompletion(systemPrompt, userPrompt, temperature);
}

async function createAzureOpenAICompletion(systemPrompt: string, userPrompt: string, temperature: number, dataSources?: any[]): Promise<any> {
    const baseEnvVars = ['OPENAI_API_KEY', 'OPENAI_ENDPOINT', 'OPENAI_MODEL'];
    const byodEnvVars = ['AZURE_AI_SEARCH_ENDPOINT', 'AZURE_AI_SEARCH_KEY', 'AZURE_AI_SEARCH_INDEX'];
    const requiredEnvVars = dataSources ? [...baseEnvVars, ...byodEnvVars] : baseEnvVars;
    checkRequiredEnvVars(requiredEnvVars);

    const config = { 
        apiKey: OPENAI_API_KEY,
        endpoint: OPENAI_ENDPOINT,
        apiVersion: OPENAI_API_VERSION,
        deployment: OPENAI_MODEL
    };
    const aoai = new AzureOpenAI(config);
    const completion = await aoai.chat.completions.create({
        model: OPENAI_MODEL, // gpt-4o, gpt-3.5-turbo, etc. Pulled from .env file
        max_tokens: 1024,
        temperature,
        response_format: {
            type: "json_object",
        },
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        // @ts-expect-error data_sources is a custom property used with the "Azure Add Your Data" feature
        data_sources: dataSources
    });
    return completion;
}

async function getAzureOpenAICompletion(systemPrompt: string, userPrompt: string, temperature: number): Promise<string> {
    const completion = await createAzureOpenAICompletion(systemPrompt, userPrompt, temperature);
    let content = completion.choices[0]?.message?.content?.trim() ?? '';
    console.log('Azure OpenAI Output: \n', content);
    if (content && content.includes('{') && content.includes('}')) {
        content = extractJson(content);
    }
    return content;
}

async function getAzureOpenAIBYODCompletion(systemPrompt: string, userPrompt: string, temperature: number): Promise<string> {
    const dataSources = [
        {
            type: 'azure_search',
            parameters: {
                authentication: {
                    type: 'api_key',
                    key: AZURE_AI_SEARCH_KEY
                },
                endpoint: AZURE_AI_SEARCH_ENDPOINT,
                index_name: AZURE_AI_SEARCH_INDEX
            }
        }
    ];

    const completion = await createAzureOpenAICompletion(systemPrompt, userPrompt, temperature, dataSources) as AzureOpenAIYourDataResponse;
    console.log('Azure OpenAI Add Your Own Data Output: \n', completion.choices[0]?.message);
    for (let citation of completion.choices[0]?.message?.context?.citations ?? []) {
        console.log('Citation Path:', citation.filepath);
    }
    return completion.choices[0]?.message?.content?.trim() ?? '';
}

async function getOpenAICompletion(systemPrompt: string, userPrompt: string, temperature = 0): Promise<string> {
    await checkRequiredEnvVars(['OPENAI_API_KEY']);

    try {
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o', // gpt-4o, gpt-3.5-turbo, etc. Note that this can be retrieve from OPENAI_MODEL env var
            max_tokens: 1024,
            temperature,
            response_format: {
                type: "json_object",
            },
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

async function completeBYOD(userPrompt: string): Promise<string> {
    const systemPrompt = 'You are an AI assistant that helps people find information in documents.';
    return await callOpenAI(systemPrompt, userPrompt, 0, true);
}

async function getSQLFromNLP(userPrompt: string): Promise<QueryData> {
    // Get the high-level database schema summary to be used in the prompt.
    // The db.schema file could be generated by a background process or the 
    // schema could be dynamically retrieved.
    const dbSchema = await fs.promises.readFile('db.schema', 'utf8');

    const systemPrompt = `
      Assistant is a natural language to SQL bot that returns a JSON object with the SQL query and 
      the parameter values in it. The SQL will query a PostgreSQL database.
      
      PostgreSQL tables with their columns:    
  
      ${dbSchema}
  
      Rules:
      - Convert any strings to a PostgreSQL parameterized query value to avoid SQL injection attacks.
      - Return a JSON object with the following structure: { "sql": "", "paramValues": [] }

      Examples:

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
        'information_schema', 'pg_catalog', 'pg_tables', 'pg_proc', 'pg_namespace', 'pg_class',
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

function checkRequiredEnvVars(requiredEnvVars: string[]) {
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing ${envVar} in environment variables.`);
        }
    }
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

export { completeBYOD, completeEmailSMSMessages, getSQLFromNLP };