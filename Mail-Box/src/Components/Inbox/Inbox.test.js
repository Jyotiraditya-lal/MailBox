

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Inbox from "./Inbox";

describe("<Inbox />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
      })
    );
    localStorage.clear();
  });

  it("should render the Inbox title", () => {
    render(<Inbox />);
    const titleElement = screen.getByText("Inbox");
    expect(titleElement).toBeInTheDocument();
  });

  it("should fetch and display mails correctly", async () => {
    const mailData = {
      mail1: {
        FromEmail: "example1@example.com",
        sub: "Test Mail 1",
        text: "This is a test mail 1",
      },
      mail2: {
        FromEmail: "example2@example.com",
        sub: "Test Mail 2",
        text: "This is a test mail 2",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mailData),
        ok: true,
      })
    );

    render(<Inbox />);

    await waitFor(() => {
      const mailItems = screen.getAllByRole("listitem");
      expect(mailItems).toHaveLength(2);

      const mail1 = screen.getByText("Test Mail 1");
      const mail2 = screen.getByText("Test Mail 2");
      expect(mail1).toBeInTheDocument();
      expect(mail2).toBeInTheDocument();
    });
  });

  it("should display a blue dot for unread mails", async () => {
    const mailData = {
      mail1: {
        FromEmail: "example1@example.com",
        sub: "Test Mail 1",
        text: "This is a test mail 1",
      },
      mail2: {
        FromEmail: "example2@example.com",
        sub: "Test Mail 2",
        text: "This is a test mail 2",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mailData),
        ok: true,
      })
    );

    localStorage.setItem("mail1", "true");

    render(<Inbox />);

    await waitFor(() => {
      const blueDot = screen.getByTestId("blue-dot-1");
      expect(blueDot).toBeInTheDocument();
    });
  });

  it("should mark a mail as read and remove the blue dot when clicked", async () => {
    const mailData = {
      mail1: {
        FromEmail: "example1@example.com",
        sub: "Test Mail 1",
        text: "This is a test mail 1",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mailData),
        ok: true,
      })
    );

    render(<Inbox />);

    await waitFor(() => {
      const mailItem = screen.getByText("Test Mail 1");

      fireEvent.click(mailItem);

      expect(screen.queryByTestId("blue-dot-1")).not.toBeInTheDocument();
    });
  });

  it("should display the modal when a mail item is clicked", async () => {
    const mailData = {
      mail1: {
        FromEmail: "example1@example.com",
        sub: "Test Mail 1",
        text: "This is a test mail 1",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mailData),
        ok: true,
      })
    );

    render(<Inbox />);

    await waitFor(() => {
      const mailItem = screen.getByText("Test Mail 1");

      fireEvent.click(mailItem);

      const modalTitle = screen.getByText("From: example1@example.com");
      const modalSubject = screen.getByText("Subject: Test Mail 1");
      const modalText = screen.getByText("This is a test mail 1");
      expect(modalTitle).toBeInTheDocument();
      expect(modalSubject).toBeInTheDocument();
      expect(modalText).toBeInTheDocument();
    });
  });

  it("should delete the mail and remove it from the list when 'Delete Mail' button is clicked", async () => {
    const mailData = {
      mail1: {
        FromEmail: "example1@example.com",
        sub: "Test Mail 1",
        text: "This is a test mail 1",
      },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mailData),
        ok: true,
      })
    );

    render(<Inbox />);

    await waitFor(() => {
      const mailItem = screen.getByText("Test Mail 1");
      const deleteButton = screen.getByText("Delete Mail");

      fireEvent.click(deleteButton);

      expect(screen.queryByText("Test Mail 1")).not.toBeInTheDocument();
    });
  });
});