import {act} from "react";
import {usePostsStore} from "@/stores/postsStore";
import {Post, PostFormInputs} from "@/types/post";

global.fetch = jest.fn();

describe("postStore", () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
        usePostsStore.setState({
            posts: [],
            isLoading: false,
            error: null,
            success: null,
        });
    });

    it("fetch posts", async () => {
        const fakePosts = [{id: 1, title: "sunt aut", body: "quia et suscipit"}];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => fakePosts,
        });

        await act(async () => {
            await usePostsStore.getState().fetchPosts();
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual(fakePosts);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    it("fetch posts failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await act(async () => {
            await usePostsStore.getState().fetchPosts();
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Failed to fetch posts.");
    });

    it("create post", async () => {
        const newPost: PostFormInputs = {title: "sunt aut", body: "quia et suscipit"};
        const newPostWithId: Post = {id: 2, title: "sunt aut", body: "quia et suscipit"};

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => newPostWithId,
        });

        await act(async () => {
            await usePostsStore.getState().createPost(newPost);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([newPostWithId]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });

    it("create post failure", async () => {
        const newPost = {title: "sunt aut", body: "quia et suscipit"};

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        await act(async () => {
            await usePostsStore.getState().createPost(newPost);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Failed to create post.");
    });


    it("fetch post by id", async () => {
        const posts: Post[] = [{id: 3, title: "sunt aut", body: "quia et suscipit"}];

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => posts[0],
        });

        await act(async () => {
            await usePostsStore.getState().fetchPostById(3);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual(posts);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });

    it("fetch post by id failure 404", async () => {

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await act(async () => {
            await usePostsStore.getState().fetchPostById(2);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Post not found");
    });

    it("fetch post by id failure 400", async () => {

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 400,
        });

        await act(async () => {
            await usePostsStore.getState().fetchPostById(2);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Failed to fetch post.");
    });

    it("update post", async () => {
        const currentPost: Post = {id: 2, title: "sunt aut", body: "quia et suscipit"};
        usePostsStore.setState({...usePostsStore.getState(), posts: [currentPost]});

        const updatedPost: Post = {id: 2, title: "lorem sunt aut", body: "ipsum dolor quia et suscipit"};

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => updatedPost,
        });

        await act(async () => {
            await usePostsStore.getState().editPost(updatedPost);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([updatedPost]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });

    it("update post failure", async () => {
        const currentPost: Post = {id: 2, title: "sunt aut", body: "quia et suscipit"};
        usePostsStore.setState({...usePostsStore.getState(), posts: [currentPost]});

        const updatedPost: Post = {id: 2, title: "lorem sunt aut", body: "ipsum dolor quia et suscipit"};

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status:400
        });

        await act(async () => {
            await usePostsStore.getState().editPost(updatedPost);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([currentPost]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Failed to update post");
    });

    it("delete post", async () => {
        const currentPost: Post = {id: 2, title: "sunt aut", body: "quia et suscipit"};
        usePostsStore.setState({...usePostsStore.getState(), posts: [currentPost]});

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
        });

        await act(async () => {
            await usePostsStore.getState().deletePost(2);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(null);
    });


    it("handles deletePost failure", async () => {
        const currentPost: Post = {id: 2, title: "sunt aut", body: "quia et suscipit"};
        usePostsStore.setState({...usePostsStore.getState(), posts: [currentPost]});


        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status:400
        });

        await act(async () => {
            await usePostsStore.getState().deletePost(2);
        });

        const state = usePostsStore.getState();
        expect(state.posts).toEqual([currentPost]);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe("Failed to delete post.");
    });
});
