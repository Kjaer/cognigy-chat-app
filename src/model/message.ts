export const enum MessageDirection {
  INCOMING = "incoming",
  OUTGOING = "outgoing",
}

export interface MessageEntity {
  id?: string;
  direction: MessageDirection;
  text: string;
}
