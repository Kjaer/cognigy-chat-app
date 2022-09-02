import React, { FC, FormEventHandler, useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  onSubmit?: (message: string) => void;
}

export const Input: FC<InputProps> = (props) => {
  const [message, setMessage] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (message !== "") {
      props.onSubmit?.(message);
      setMessage("");
    }
  };

  return (
    <form className={styles["message-form"]} onSubmit={handleSubmit}>
      <input
        className={styles["message-input"]}
        placeholder="type here"
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className={styles["message-submit"]}
        aria-label="send message"
      >
        <img
          src="https://icongr.am/octicons/paper-airplane.svg?size=24&color=ffffff"
          alt="Send Message"
        />
      </button>
    </form>
  );
};
