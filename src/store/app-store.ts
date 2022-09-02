import type { PreloadedState } from "@reduxjs/toolkit";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import messageHistoryReducer from "./message-history";

const rootReducer = combineReducers({
  messageHistory: messageHistoryReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
