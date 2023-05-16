import { Injectable } from "@angular/core";

declare const API_PORT: string;

@Injectable({ providedIn: 'root' })
export class ApiUrlService {

    apiUrl = '';

    getApiUrl() {
        if (this.apiUrl) return this.apiUrl;

        const codespacesUrlSuffix = 'preview.app.github.dev';
        let url = `${window.location.protocol}//${window.location.hostname}`;
        const appPort = 4200;
        const suffix = '/api/';
    
        // Handle GitHub Codespaces URLs
        if (window.location.hostname.includes(codespacesUrlSuffix)) {
          url = url.replace(`-${appPort}.${codespacesUrlSuffix}`, `-${API_PORT}.${codespacesUrlSuffix}`);
          this.apiUrl =  url + suffix;
        }
        else {
          this.apiUrl = `${url}:${API_PORT}${suffix}`;
        }
        
        return this.apiUrl;
    } 

}