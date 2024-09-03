import { EmailSmsCompletion } from "@shared/interfaces";

export interface EmailSmsDialogData {
  title: string;
  prompt: string;
  customerPhoneNumber: string;
  company: string;
  customerName: string;
  customerEmailAddress: string;
  data?: EmailSmsCompletion;
}