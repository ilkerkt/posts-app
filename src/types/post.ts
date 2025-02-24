import {z} from "zod";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export type PostFormInputs = Omit<Post, "id">;

export const postFormSchema: z.ZodType<PostFormInputs> = z.object({
    title: z.string().min(1, {message: "Title is required"})
        .max(250, {message: "Title cannot be longer than 250 characters."}),
    body: z.string().min(1, {message: "Body is required"})
        .max(2000, {message: "Body cannot be longer than 2000 characters."}),
});

