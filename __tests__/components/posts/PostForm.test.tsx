import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostForm } from "@/components/posts/PostForm";

const initialValues = { title: "", body: "" };

describe("PostForm", () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("render form", () => {
        render(
            <PostForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        );

        expect(screen.getByLabelText(/title/i)).toBeDefined();
        expect(screen.getByLabelText(/body/i)).toBeDefined();

        expect(screen.getByRole("button", { name: /submit/i })).toBeDefined();
        expect(screen.getByRole("button", { name: /cancel/i })).toBeDefined();
    });

    it("call submit", async () => {
        render(
            <PostForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel="Submit"
            />
        );

        const titleInput = screen.getByLabelText(/title/i);
        const bodyInput = screen.getByLabelText(/body/i);
        const submitButton = screen.getByRole("button", { name: /submit/i });

        fireEvent.change(titleInput, { target: { value: "title" } });
        fireEvent.change(bodyInput, { target: { value: "body" } });

        fireEvent.click(submitButton);

        await waitFor(() =>
            expect(onSubmit).toHaveBeenCalled()
        );
    });
    it("show validation error", async () => {
        render(
            <PostForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
                submitLabel="Submit"
            />
        );

        const submitButton = screen.getByRole("button", { name: /submit/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/title is required/i)).toBeDefined();
            expect(screen.getByText(/body is required/i)).toBeDefined();
        });

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("call cancel", () => {
        render(
            <PostForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        );

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalled();
    });
});
