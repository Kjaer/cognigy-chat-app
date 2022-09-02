import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MessageEntity } from "../model/message";

export interface MessageHistoryState {
  messages: Array<MessageEntity>;
  sessionId: string;
}

const initialState: MessageHistoryState = {
  messages: [],
  sessionId: "",
};

export const messageHistorySlice = createSlice({
  name: "messageHistory",
  initialState,
  reducers: {
    addNewMessage(state, action: PayloadAction<MessageEntity>) {
      const message = { ...action.payload, id: nanoid() };
      state.messages.push(message);
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
    },
  },
});

export const { addNewMessage, setSessionId } = messageHistorySlice.actions;

export default messageHistorySlice.reducer;
