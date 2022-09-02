import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";

describe("Input component", () => {
  let submitMock = jest.fn();

  afterEach(() => {
    submitMock.mockReset();
  });

  it("invokes submit on the parent component", async () => {
    render(<Input onSubmit={submitMock} />);

    const messageInput = screen.getByPlaceholderText(/type here/);
    await userEvent.type(messageInput, "test-message");
    const submitButton = screen.getByRole("button", { name: "send message" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitMock).toBeCalledWith("test-message");
    });
  });
});
