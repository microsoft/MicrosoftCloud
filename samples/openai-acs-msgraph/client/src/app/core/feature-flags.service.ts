import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeatureFlagsService {
    microsoft365Enabled = (environment.ENTRAID_CLIENT_ID) ? true : false;
    acsPhoneEnabled = (environment.ACS_PHONE_NUMBER) ? true : false;
    acsEmailEnabled = environment.ACS_EMAIL_ADDRESS;
    openAIEnabled = environment.OPENAI_API_KEY;
    byodEnabled = environment.BYOD_ENABLED;
}