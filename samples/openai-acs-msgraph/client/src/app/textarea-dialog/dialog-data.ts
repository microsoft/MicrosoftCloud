export interface DialogBase {
  title: string;
  message: string;
  action?: (message: string) => Promise<DialogBase | TeamsDialogData>
}

export interface TeamsDialogData extends DialogBase {
  id: string;
  teamId: string;
  channelId: string;
  webUrl: string;
}