import { render, screen } from "@testing-library/react";

import { Message } from "./Message";
import { MessageDirection } from "../../model/message";

describe("Message component", () => {
  it("render incoming type message", () => {
    render(
      <Message direction={MessageDirection.INCOMING}>Test Message</Message>
    );
    const message = screen.getByText(/Test Message/);

    expect(message.classList.contains("incoming-message")).toBeTruthy();
  });

  it("render outgoing type message", () => {
    render(
      <Message direction={MessageDirection.OUTGOING}>Test Message</Message>
    );
    const message = screen.getByText(/Test Message/);

    expect(message.classList.contains("outgoing-message")).toBeTruthy();
  });
});
