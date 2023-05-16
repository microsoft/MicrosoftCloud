export interface QueryData {
    sql: string;
    paramValues: any[];
    error: string;
}

export interface EmailSmsResponse {
    status: boolean;
    email: string;
    sms: string;
    error: string;
}

export interface AzureOpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
    choices: [{
        role: string;
        message: {
            content: string;
        }
    }],
    finish_reason: string;
    index: number;
};