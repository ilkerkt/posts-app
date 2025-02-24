import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PostItem } from "@/components/posts/PostItem";
import { Post } from "@/types/post";

describe("PostItem", () => {
    const mockPost: Post = {
        id: 1,
        title: "title",
        body: "body",
    };

    it("render portItem", () => {
        render(<PostItem post={mockPost} onDelete={jest.fn()} />);
        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading.textContent).toBe("title");

        expect(screen.getByText("body")).toBeDefined();
    });

    it("call delete", () => {
        const onDeleteMock = jest.fn();
        render(<PostItem post={mockPost} onDelete={onDeleteMock} />);

        const buttons = screen.getAllByRole("button");

        fireEvent.click(buttons[0]);
        expect(onDeleteMock).toHaveBeenCalled();
    });
});
