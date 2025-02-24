import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {usePostsStore} from "@/stores/postsStore";
import {Post} from "@/types/post";

export function usePostById() {
    const router = useRouter();
    const {id} = router.query;
    const postId = id ? Number(id) : null;
    const {fetchPostById, isLoading, error, editPost} = usePostsStore();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (postId !== null && !post) {
            fetchPostById(postId).then((postById) => setPost(postById));
        }
    }, [postId, post, fetchPostById]);

    return {post, editPost, isLoading, error, router};
}