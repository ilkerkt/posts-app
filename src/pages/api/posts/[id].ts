import {NextApiRequest, NextApiResponse} from "next";
import {Post} from "@/types/post";
import fetchMockedPosts, {posts} from "@/pages/api/posts/mockUtil";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // assumption that if there is no data in mock store initialize the api with data
    if (posts?.length == 0) {
        const mockedPosts: Post[] = await fetchMockedPosts();
        posts.push(...mockedPosts);
    }

    const {id} = req.query;
    const postId = parseInt(id as string, 10);

    if (req.method === "GET") {
        const post = posts.find((post) => post.id === postId);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    } else if (req.method === "PUT") {
        const index = posts.findIndex((post) => post.id === postId);
        if (index !== -1) {
            const updatedPost = {...posts[index], ...req.body};
            posts[index] = updatedPost;
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({message: "Post not found"});
        }
    } else if (req.method === "DELETE") {
        const index = posts.findIndex((post) => post.id === postId);
        if (index !== -1) {
            posts.splice(index, 1);
            res.status(200).json({message: "Post deleted"});
        } else {
            res.status(404).json({message: "Post not found"});
        }
    }
}
