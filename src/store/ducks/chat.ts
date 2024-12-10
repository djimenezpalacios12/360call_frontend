import { ChatBot, ChatStore } from "@/interfaces/chat.interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const nameSlice = "CHAT";
const initialState: ChatStore = {
  chatHistory: [],
  threadId: "",
  filesCodeInterpreter: [],
  filesSearch: [],
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    setChat: (state: ChatStore, action: PayloadAction<ChatBot[]>) => {
      return { ...state, chatHistory: action.payload };
    },
    setThreadId: (state: ChatStore, action: PayloadAction<string>) => {
      return { ...state, threadId: action.payload };
    },
    setFileCodeInterpreter: (state: ChatStore, action: PayloadAction<string[]>) => {
      return { ...state, filesCodeInterpreter: action.payload };
    },
    setFilesSearch: (state: ChatStore, action: PayloadAction<string[]>) => {
      return { ...state, filesSearch: action.payload };
    },
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setChat, resetApp, setThreadId, setFileCodeInterpreter, setFilesSearch } = app.actions;
export default app.reducer;
