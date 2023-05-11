import { CommunicationIdentityClient } from '@azure/communication-identity';
import { EmailClient, EmailMessage, KnownEmailSendStatus } from '@azure/communication-email';
import { SmsClient, SmsSendResult } from '@azure/communication-sms';
import './config';

const connectionString = process.env.ACS_CONNECTION_STRING as string;

async function createACSToken() {
  if (!connectionString) return { userId: '', token: '' };

  const tokenClient = new CommunicationIdentityClient(connectionString);
  const user = await tokenClient.createUser();
  const userToken = await tokenClient.getToken(user, ["voip"]);
  return { userId: user.communicationUserId, ...userToken };

}

async function sendEmail(subject: string, message: string,
  customerName: string, customerEmailAddress: string): Promise<{ status: boolean, id: string }> {
  if (!connectionString) return { status: false, id: '' };

  const emailClient = new EmailClient(connectionString);
  try {
    const msgObject: EmailMessage = {
      senderAddress: process.env.ACS_EMAIL_ADDRESS as string,
      content: {
        subject: subject,
        plainText: message,
      },
      recipients: {
        to: [
          {
            address: customerEmailAddress,
            displayName: customerName,
          },
        ],
      },
    };

    const poller = await emailClient.beginSend(msgObject);

    /**
     **  Returning a promise that resolves immediately since we're not using the send Id.
    **/
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: true, id: '123' });
      }, 500);
    });

    /**
     **  Uncomment the following line and comment out the return statement above 
     **  if you want to wait until the email send operation is officially completed.
     **  This will take longer, but will allow you to get an Id for the send operation.
    **/
    // return pollEmailSend(poller);
  }
  catch (e: unknown) {
    console.log(e);
    return { status: false, id: '' };
  }
}

async function sendSms(message: string, customerPhoneNumber: string): Promise<SmsSendResult[]> {
  const smsClient = new SmsClient(connectionString);

  try {
    const sendResults = await smsClient.send({
      from: process.env.ACS_PHONE_NUMBER as string,
      to: [customerPhoneNumber],
      message
    });
    console.log('SMS message sent successfully', sendResults);
    return sendResults;
  }
  catch (e: unknown) {
    console.log(e);
    return [];
  }
}

async function pollEmailSend(poller: any) : Promise<{ status: boolean, id: string }> {
    const waitTime = 10;
    if (!poller.getOperationState().isStarted) {
      throw "Poller was not started."
    }

    let timeElapsed = 0;
    while (!poller.isDone()) {
      poller.poll();
      console.log("Email send polling in progress");

      await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
      timeElapsed += 10;

      if (timeElapsed > 18 * waitTime) {
        throw "Polling timed out.";
      }
    }

    const result = poller.getResult();
    if (result) {
      if (result.status === KnownEmailSendStatus.Succeeded) {
        console.log(`Successfully sent the email (operation id: ${result.id})`);
        return { status: true, id: result.id };
      }
      else {
        throw result.error;
      }
    }
    else {
      throw "Result was null.";
    }
}

export { createACSToken, sendEmail, sendSms };