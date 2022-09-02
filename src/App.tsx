import type { RootState } from "./store/app-store";
import type { MessageBotResponseCallback } from "./hooks/useMessageBot";
import { MessageDirection, MessageEntity } from "./model/message";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMessageBot from "./hooks/useMessageBot";

import { addNewMessage, setSessionId } from "./store/message-history";

import { History } from "./components/history/History";
import { Message } from "./components/message/Message";
import { Input } from "./components/input/Input";

import styles from "./App.module.css";

function App() {
  const messages = useSelector(
    ({ messageHistory }: RootState) => messageHistory.messages
  );
  const dispatch = useDispatch();

  const messageBotResponseCallback = useCallback<MessageBotResponseCallback>(
    (response) => {
      const message: Omit<MessageEntity, "id"> = {
        direction: MessageDirection.INCOMING,
        text: response.text,
      };

      dispatch(addNewMessage(message));
    },
    [dispatch]
  );

  const messageBot = useMessageBot(messageBotResponseCallback);

  useEffect(() => {
    dispatch(setSessionId(messageBot.socketOptions.sessionId));
  }, [dispatch, messageBot.socketOptions.sessionId]);

  function add(text: string) {
    const message: Omit<MessageEntity, "id"> = {
      direction: MessageDirection.OUTGOING,
      text,
    };

    messageBot.sendMessage(text);

    dispatch(addNewMessage(message));
  }

  return (
    <div className={styles.App}>
      <h1>Cognigy Message App</h1>

      <History>
        {messages.length === 0 && (<small className={styles['no-message']}>No messages</small>)}
        {messages.map((message) => (
          <Message key={message.id} direction={message.direction}>
            {message.text}
          </Message>
        ))}
      </History>

      <Input onSubmit={add} />
    </div>
  );
}

export default App;
