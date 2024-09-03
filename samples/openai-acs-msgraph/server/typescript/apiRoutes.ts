import { Router } from 'express';
import './config';

import { createACSToken, sendEmail, sendSms } from './acs';
import { initializeDb } from './initDatabase';
import { completeBYOD, completeEmailSMSMessages, getSQLFromNLP } from './openAI';
import { getCustomers, queryDb } from './postgres';

const router = Router();

initializeDb().catch(err => console.error(err));

router.get('/acstoken', async (req, res) => {
    const token = await createACSToken();
    res.json(token);
});

router.get('/customers', async (req, res) => {
    try {
        const results = await getCustomers();
        if (results && results.rows) {
            res.json(results.rows);
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Error retrieving customers.' });
    }
});

router.post('/generateSql', async (req, res) => {
    const userPrompt = req.body.prompt;

    if (!userPrompt) {
        return res.status(400).json({ error: 'Missing parameter "prompt".' });
    }

    try {
        // Call Azure OpenAI to convert the user prompt into a SQL query
        const sqlCommandObject = await getSQLFromNLP(userPrompt);

        let result: any[] = [];
        // Execute the SQL query
        if (sqlCommandObject && !sqlCommandObject.error) {
            result = await queryDb(sqlCommandObject) as any[];
        }
        else {
            result = [ { query_error : sqlCommandObject.error } ];
        }
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error generating or running SQL query.' });
    }
});

router.post('/sendEmail', async (req, res) => {
    const { subject, message, customerName, customerEmailAddress } = req.body;

    if (!subject || !message || !customerName || !customerEmailAddress) {
        return res.status(400).json({
            status: false,
            message: 'The subject, message, customerName, and customerEmailAddress parameters must be provided!'
        });
    }

    try {
        const sendResults = await sendEmail(subject, message, customerName, customerEmailAddress);
        console.log(sendResults);
        res.json({
            status: sendResults.status,
            messageId: sendResults.id
        });
    }
    catch (e: unknown) {
        console.error(e);
        res.status(500).json({
            status: false,
            messageId: ''
        });
    }
});

router.post('/sendSms', async (req, res) => {
    const message = req.body.message;
    const customerPhoneNumber = req.body.customerPhoneNumber;

    if (!message || !customerPhoneNumber) {
        return res.status(400).json({
            status: false,
            message: 'The message and customerPhoneNumber parameters must be provided!'
        });
    }

    try {
        const sendResults = await sendSms(message, customerPhoneNumber);
        res.json({
            status: sendResults[0].successful,
            messageId: sendResults[0].messageId
        });
    }
    catch (e: unknown) {
        console.error(e);
        res.status(500).json({
            status: false,
            messageId: ''
        });
    }
});

router.post('/completeEmailSmsMessages', async (req, res) => {
    const { prompt, company, contactName } = req.body;

    if (!prompt || !company || !contactName) {
        return res.status(400).json({ 
            status: false, 
            error: 'The prompt, company, and contactName parameters must be provided.' 
        });
    }

    let result;
    try {
        // Call OpenAI to get the email and SMS message completions
       result = await completeEmailSMSMessages(prompt, company, contactName);
    }
    catch (e: unknown) {
        console.error('Error parsing JSON:', e);
    }

    res.json(result);
});

router.post('/completeBYOD', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ 
            status: false, 
            error: 'The prompt parameter must be provided.' 
        });
    }

    let result;
    try {
        // Call OpenAI to get custom "bring your own data" completion
       result = await completeBYOD(prompt);
    }
    catch (e: unknown) {
        console.error('Error parsing JSON:', e);
    }

    res.json(result);
});

export default router;