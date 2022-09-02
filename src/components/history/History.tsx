import React, { FC, PropsWithChildren } from "react";
import styles from "./History.module.css";

export const History: FC<PropsWithChildren> = (props) => {
  return (
    <section className={styles.history}>
      <div>{props.children}</div>
    </section>
  );
};
