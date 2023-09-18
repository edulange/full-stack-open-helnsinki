import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parents state and calls onSubmit", async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createBlog} />);

	const input = screen.getAllByRole("textbox");
	const sendButton = screen.getByText("Create");

	await user.type(input[0], "testing a title...");
	await user.type(input[1], "testing the author...");
	await user.click(sendButton);

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe("testing a title...");
	expect(createBlog.mock.calls[0][0].author).toBe("testing the author...");
});
