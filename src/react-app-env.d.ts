/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_ENDPOINT_BASE_URL: string;
    REACT_APP_ENDPOINT_URL_TOKEN: string;
  }
}
