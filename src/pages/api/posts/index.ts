import {NextApiRequest, NextApiResponse} from "next";
import {Post} from "@/types/post";
import fetchMockedPosts, {posts} from "@/pages/api/posts/mockUtil";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // assumption that if there is no data in mock store initialize the api with data
    if (posts?.length == 0) {
        const mockedPosts: Post[] = await fetchMockedPosts();
        posts.push(...mockedPosts);
    }
    if (req.method === "GET") {
        res.status(200).json(posts);
    } else if (req.method === "POST") {
        const {title, body} = req.body;
        const id = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
        const newPost: Post = {id, title, body};
        posts.push(newPost);
        res.status(201).json(newPost);
    } else {
        res.status(400);
    }
}
