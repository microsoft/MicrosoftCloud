import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.join(__dirname, '..', '..', '.env');
  const env = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
  
  return env;
}

function updateEnvironment(isProd = false) {
  const env = loadEnv();
  
  // Build the environment object
  const envObject = {
    production: isProd,
    apiUrl: env.NG_APP_API_URL || '',
    ENTRAID_CLIENT_ID: env.ENTRAID_CLIENT_ID || '',
    TEAM_ID: env.TEAM_ID || '',
    CHANNEL_ID: env.CHANNEL_ID || '',
    OPENAI_API_KEY: !!env.OPENAI_API_KEY,
    ACS_CONNECTION_STRING: !!env.ACS_CONNECTION_STRING,
    ACS_PHONE_NUMBER: env.ACS_PHONE_NUMBER || '',
    ACS_EMAIL_ADDRESS: !!env.ACS_EMAIL_ADDRESS,
    CUSTOMER_EMAIL_ADDRESS: env.CUSTOMER_EMAIL_ADDRESS || '',
    CUSTOMER_PHONE_NUMBER: env.CUSTOMER_PHONE_NUMBER || '',
    API_PORT: env.API_PORT || '',
    BYOD_ENABLED: !!env.AZURE_AI_SEARCH_ENDPOINT
  };
  
  // Generate the TypeScript content
  const entries = Object.entries(envObject).map(([key, value]) => {
    if (typeof value === 'boolean') {
      return `  ${key}: ${value}`;
    } else {
      return `  ${key}: '${value}'`;
    }
  });
  
  const content = `export const environment = {
${entries.join(',\n')}
};`;
  
  const envFile = isProd ? 'environment.prod.ts' : 'environment.ts';
  const envPath = path.join(__dirname, '..', 'src', 'environments', envFile);
  
  fs.writeFileSync(envPath, content);
  console.log(`Updated ${envFile}`);
}

// Run for both environments
updateEnvironment(false); // development
updateEnvironment(true);  // production