import {Post} from "@/types/post";

export const posts: Post[] = [];

export default async function fetchMockedPosts() {
    try {
        const response = await fetch(`${process.env.API_URL}/posts`);
        if (!response.ok) {
            throw new Error(`Error occurred while fetching posts status: ${response.status} message: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}