export interface Phone {
    phone: string;
}

export interface EmailSmsCompletion {
    emailSubject: string;
    emailBody: string;
    error: string;
    sms: string;
    status: boolean;
}

export interface BYODCompletion {
    status: boolean;
    content: string;
    error: string;
}

export interface Customer {
    id: number;
    company: string;
    city: string;
    email: string;
}

export interface EmailSmsResponse {
    status: boolean;
}

export interface AcsUser {
    userId: string;
    token: string;
    expiresOn: Date;
}

export interface OneDriveFile {
    size: number;
    fileSystemInfo: {
        createdDateTime: Date;
        lastModifiedDateTime: Date;
    },
    id: string;
    createdBy: {
        user: {
            displayName: string;
            email: string;
        }
    },
    createdDateTime: Date;
    lastModifiedBy: {
        user: {
            displayName: string;
            email: string;
        }
    },
    lastModifiedDateTime: Date;
    name: string;
    parentReference: {
        driveId: string;
        id: string;
        sharepointIds: {
            listId: string;
            listItemId: number;
            listItemUniqueId: string;
        },
        siteId: string;
    },
    webUrl: string;
  }
  
  export interface ChatMessageInfo {
    teamId: string; 
    channelId: string;  
    messageId: string; 
    summary: string; 
  }
  
  export interface ChatMessage {
    id: string;
    teamId: string;
    channelId: string;
    summary: string;
    body: string;
    from: string;
    date: Date;
    webUrl: string;
  }