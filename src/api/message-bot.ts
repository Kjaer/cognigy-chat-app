import { SocketClient } from "@cognigy/socket-client";

const API_BASE_URL = process.env.REACT_APP_ENDPOINT_BASE_URL;
const API_TOKEN = process.env.REACT_APP_ENDPOINT_URL_TOKEN;

function createClient(url: string, token: string) {
  if (!url || !token) {
    throw new Error("missing parameter for setting socket client.", {
      cause: `url: ${url} or token: ${token} is missing.`,
    });
  }

  return () => {
    return new SocketClient(url, token);
  };
}

export const messageBotClientInitializer = createClient(
  API_BASE_URL,
  API_TOKEN
);
