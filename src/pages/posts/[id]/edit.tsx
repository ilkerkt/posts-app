import Head from "next/head";
import {PostFormInputs} from "@/types/post";
import {PostForm} from "@/components/posts/PostForm";
import {Header} from "@/components/common/Header";
import styles from "@/styles/PostDetail.module.css";
import React, {useCallback} from "react";
import DataBoundary from "@/components/common/DataBoundary";
import {usePostById} from "@/hooks/usePostById";

const POST_TITLE = "Post Details";
const ERROR_MESSAGE = "Error occurred while editing the post.";
export default function EditPost() {
    const {post, editPost, isLoading, error, router} = usePostById();

    const handleUpdate = useCallback(async (data: PostFormInputs) => {
        if (!post) return;
        await editPost({id: post.id, title: data.title, body: data.body});
        router.push(`/posts/${post.id}`);
    }, [post, editPost, router]);

    const handleCancel = useCallback(() => {
        if (!post) return;
        router.push(`/posts/${post.id}`);
    }, [post, router])

    return (
        <>
            <Head>
                <title>{post ? post.title : POST_TITLE}</title>
            </Head>
            <div className={styles.container}>
                <Header title="Edit Post" showBack/>
                <DataBoundary isLoading={isLoading} error={error} errorMessage={ERROR_MESSAGE}>
                    {post && (
                        <PostForm initialValues={{title: post.title, body: post.body}} onSubmit={handleUpdate}
                                  onCancel={handleCancel} submitLabel="Save"/>
                    )}
                </DataBoundary>
            </div>
        </>
    );
}
