import { EventEmitter } from "node:events";

import { renderHook, act } from "@testing-library/react";
import useMessageBot from "./useMessageBot";

const mockMessageBotEmitter = new EventEmitter();
const mockConnect = jest.fn();
const mockDisconnect = jest.fn();
const mockSendMessage = jest.fn();

jest.mock("../api/message-bot", () => ({
  messageBotClientInitializer() {
    return Object.assign(mockMessageBotEmitter, {
      connect: mockConnect.mockImplementation(() => Promise.resolve("ok")),
      disconnect: mockDisconnect,
      sendMessage: mockSendMessage.mockImplementation((text) => {
        mockMessageBotEmitter.emit("output", { text });
      }),
    });
  },
}));

describe("useMessageBot hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  it("connects and disconnects from message bot", async () => {
    const { unmount } = renderHook(() => useMessageBot(jest.fn()));

    // waitFor or act won't work here for some reason. My bet is babel is having
    // struggles transpiling `asyc/await` functions. When I attempt to render the hook,
    // it calls `connect` functions which returns promise. It's happening in the `useEffect`
    // callback. But somehow, execution flow cluttered when it hits the `await messageBotClient.connect();`
    // line and returns here to the test. So it skips the following
    // - messageBotClient.on("output", callback);
    // and
    // messageBotClient.on("error", (error) => {...
    // lines. and continue to run `expect(mockConnect).toHaveBeenCalled();`
    // I realized by help of this post (https://github.com/testing-library/react-hooks-testing-library/issues/445)
    // event loop put `await messageBotClient.connect();` to the queue and continue processing next
    // tasks which is test, and pause the rest of the code execution after `event loop put `await messageBotClient.connect();`
    // In order to give flow back, I do the same thing by adding `await Promise.resolve();` micro task. So I am
    // holding test execution and event loop continue to process `useEffect` callback.

    await Promise.resolve();

    expect(mockConnect).toHaveBeenCalled();

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("invoke callback if message received", async () => {
    const messageReceivedCallbackMock = jest.fn();

    const { result } = renderHook(() =>
      useMessageBot(messageReceivedCallbackMock)
    );

    await Promise.resolve();

    act(() => {
      result.current.sendMessage("example");
    });

    expect(messageReceivedCallbackMock).toHaveBeenCalledWith({
      text: "example",
    });
  });
});
