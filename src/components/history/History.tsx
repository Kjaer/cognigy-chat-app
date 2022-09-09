import React, { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import styles from "./History.module.css";

export const History: FC<PropsWithChildren> = (props) => {
  const messageWrapper = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if(messageWrapper.current){
      messageWrapper.current.scrollTop = messageWrapper.current.scrollHeight;
    }
  })

  return (
    <section className={styles.history} ref={messageWrapper}>
      <div>{props.children}</div>
    </section>
  );
};
