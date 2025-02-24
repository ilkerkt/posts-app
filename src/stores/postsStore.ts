import {create} from 'zustand';
import {Post, PostFormInputs} from "@/types/post";

interface PostsState {
    posts: Post[];
    isLoading: boolean;
    error: string | null;
    success: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostById: (id: number) => Promise<Post | null>;
    createPost: (newPost: PostFormInputs) => Promise<void>;
    editPost: (updatedPost: Post) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}

const POSTS_API_URL = "/api/posts";

function getErrorMessage(error: unknown): string {
    const unknownErrorOccurred = "Unexpected error occurred.";
    if (error instanceof Error) {
        return error.message;
    }
    return unknownErrorOccurred;
}

export const usePostsStore = create<PostsState>((set, get) => ({
    posts: [],
    isLoading: false,
    error: null,
    success: null,

    fetchPosts: async () => {
        set({isLoading: true, error: null});
        try {
            const res = await fetch(POSTS_API_URL);
            if (!res.ok) throw new Error("Failed to fetch posts.");
            const data = await res.json();
            set({posts: data, isLoading: false});
        } catch (error: unknown) {
            set({error: getErrorMessage(error), isLoading: false});
            console.error("Error occurred while fetching posts", error);
        }
    },

    fetchPostById: async (id: number) => {
        const existingPost = get().posts.find((p) => p.id === id);
        if (existingPost) return existingPost;

        set({isLoading: true, error: null});
        try {
            const res = await fetch(`${POSTS_API_URL}/${id}`);
            if (!res.ok) {
                if (res.status === 404) {
                    set({error: "Post not found", isLoading: false});
                    return null;
                } else {
                    throw new Error("Failed to fetch post.");
                }
            }
            const post: Post = await res.json();
            set((state) => ({posts: [...state.posts, post], isLoading: false}));
            return post;
        } catch (error: unknown) {
            set({error: getErrorMessage(error), isLoading: false});
            console.error(`Error occurred while fetching post by id: ${id}`, error);
            return null;
        }
    },

    createPost: async (newPost: PostFormInputs) => {
        set({isLoading: true, error: null});
        try {
            const res = await fetch(POSTS_API_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newPost),
            });
            if (!res.ok) throw new Error("Failed to create post.");
            const created = await res.json();
            set((state) => ({
                posts: [...state.posts, created],
                isLoading: false,
                success: "Post created successfully"
            }));
        } catch (error: unknown) {
            set({error: getErrorMessage(error), isLoading: false});
            console.error("Error occurred while creating post", error);
        }
    },

    editPost: async (updatedPost: Post) => {
        set({isLoading: true, error: null});
        try {
            const res = await fetch(`${POSTS_API_URL}/${updatedPost.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedPost),
            });
            if (!res.ok) throw new Error("Failed to update post");
            const updated = await res.json();
            set((state) => ({
                posts: state.posts.map((p) => (p.id === updatedPost.id ? updated : p)),
                isLoading: false,
                success: "Post updated successfully."
            }));
        } catch (error: unknown) {
            set({error: getErrorMessage(error), isLoading: false});
            console.error(`Error occurred while updating post with id ${updatedPost.id}`, error);
        }
    },

    deletePost: async (id: number) => {
        set({isLoading: true, error: null});
        try {
            const res = await fetch(`${POSTS_API_URL}/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete post.");

            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id),
                isLoading: false,
                success: "Post deleted successfully."
            }));
        } catch (error: unknown) {
            set({error: getErrorMessage(error), isLoading: false});
            console.error(`Error occurred while deleting post with id ${id}`, error);
        }
    },
}));
