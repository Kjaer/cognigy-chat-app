import { useEffect, useState } from "react";
import { messageBotClientInitializer } from "../api/message-bot";

export type MessageBotResponseCallback = (param: {
  text: string;
  data?: unknown;
}) => void;

const useMessageBot = (callback: MessageBotResponseCallback) => {
  const [messageBotClient] = useState(() => messageBotClientInitializer());

  useEffect(() => {
    async function setup() {
      await messageBotClient.connect();

      messageBotClient.on("output", callback);

      messageBotClient.on("error", (error) => {
        throw new Error(error.message);
      });
    }

    void setup();

    return () => {
      messageBotClient.disconnect();
    };
  }, [callback, messageBotClient]);

  return messageBotClient;
};

export default useMessageBot;
