import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ComposeMail from "./ComposeMail";

describe("<ComposeMail />", () => {
  test("should render and have initial state", () => {
    render(<ComposeMail />);
    
    const composeContainer = screen.getByTestId("compose-container");
    expect(composeContainer).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Recipients").value).toBe("");
    expect(screen.getByPlaceholderText("Subject").value).toBe("");
    expect(screen.getByPlaceholderText("Compose your email...").value).toBe("");
  });

  test("should update email input field", () => {
    render(<ComposeMail />);
    const emailInput = screen.getByPlaceholderText("Recipients");

    fireEvent.change(emailInput, { target: { value: "recipient@example.com" } });
    expect(emailInput.value).toBe("recipient@example.com");
  });

  test("should update subject input field", () => {
    render(<ComposeMail />);
    const subjectInput = screen.getByPlaceholderText("Subject");

    fireEvent.change(subjectInput, { target: { value: "Test Subject" } });
    expect(subjectInput.value).toBe("Test Subject");
  });

  test("should update body textarea", () => {
    render(<ComposeMail />);
    const bodyTextarea = screen.getByPlaceholderText("Compose your email...");

    fireEvent.change(bodyTextarea, { target: { value: "Test email body." } });
    expect(bodyTextarea.value).toBe("Test email body.");
  });

  test("should send email successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(<ComposeMail />);
    const sendButton = screen.getByText("Send");

    fireEvent.click(sendButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/https:\/\/mailbox-f4ddb-default-rtdb\.asia-southeast1\.firebasedatabase\.app\/mail\/.*\.json/),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          email: "",
          sub: "",
          text: "",
        }),
      })
    );

    // Wait for the "done!" alert to appear
    await screen.findByText("done!");
  });

  test("should show error when sending email fails", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    render(<ComposeMail />);
    const sendButton = screen.getByText("Send");

    fireEvent.click(sendButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Wait for the error alert to appear
    await screen.findByText("Could not send the mail");
  });

  afterEach(() => {
    // Cleanup the mock functions after each test
    jest.clearAllMocks();
  });
});
