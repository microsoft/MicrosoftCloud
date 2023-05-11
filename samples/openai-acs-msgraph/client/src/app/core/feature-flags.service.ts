import { Injectable } from "@angular/core";

declare const AAD_CLIENT_ID: string;
declare const ACS_PHONE_NUMBER: string;
declare const ACS_EMAIL_ADDRESS: string;
declare const OPENAI_API_KEY: string;

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
    microsoft365Enabled = (AAD_CLIENT_ID) ? true : false;
    acsPhoneEnabled = (ACS_PHONE_NUMBER) ? true : false;
    acsEmailEnabled = (ACS_EMAIL_ADDRESS) ? true : false;
    openAIEnabled = (OPENAI_API_KEY) ? true : false;
}