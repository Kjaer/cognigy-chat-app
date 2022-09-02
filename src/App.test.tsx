import { EventEmitter } from "node:events";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "./utils/test-utils";
import App from "./App";

const mockMessageBotEmitter = new EventEmitter();

jest.mock("./api/message-bot", () => {
  const mockConnect = jest.fn();
  const mockSendMessage = jest.fn();

  return {
    messageBotClientInitializer() {
      return Object.assign(mockMessageBotEmitter, {
        connect: mockConnect.mockImplementation(() => Promise.resolve("ok")),
        disconnect: jest.fn(),
        sendMessage: mockSendMessage.mockImplementation((text) => {
          mockMessageBotEmitter.emit("output", { text: `You said: ${text}` });
        }),
        socketOptions: { sessionId: "connected-session-id" },
      });
    },
  };
});

describe("Message App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it.only("send messages to the bot and bot responds", async () => {
    renderWithProvider(<App />);

    const messageInput = screen.getByPlaceholderText(/type here/);
    await userEvent.type(messageInput, "test-message");
    const submitButton = screen.getByRole("button", { name: "send message" });
    await userEvent.click(submitButton);

    expect(screen.getByText("test-message")).toBeInTheDocument();
    expect(screen.getByText("You said: test-message")).toBeInTheDocument();
  });
});
