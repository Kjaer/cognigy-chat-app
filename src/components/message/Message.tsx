import React, { FC, PropsWithChildren } from "react";

import { MessageDirection } from "../../model/message";
import styles from "./Message.module.css";

interface MessageProps extends PropsWithChildren {
  direction: MessageDirection;
}

export const Message: FC<MessageProps> = (props) => {
  const { direction } = props;

  const messageType =
    direction === MessageDirection.INCOMING
      ? styles["incoming-message"]
      : styles["outgoing-message"];

  return (
    <div className={styles["message-wrapper"]}>
      <p className={`${styles.message} ${messageType}`}>{props.children}</p>
    </div>
  );
};
