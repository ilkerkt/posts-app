import Head from "next/head";
import {Header} from "@/components/common/Header";
import {Button} from "@/components/common/Button";
import Link from "next/link";
import styles from '@/styles/PostDetail.module.css';
import React from "react";
import DataBoundary from "@/components/common/DataBoundary";
import {usePostById} from "@/hooks/usePostById";

const POST_TITLE = "Post Details";
const ERROR_MESSAGE = "Error occurred while loading post."
export default function PostDetail() {
    const {post, isLoading, error} = usePostById();

    const editButton = post && (
        <Link href={`/posts/${post.id}/edit`}>
            <Button>Edit</Button>
        </Link>
    );
    return (
        <>
            <Head>
                <title>{post ? post.title : POST_TITLE}</title>
            </Head>
            <div className={styles.container}>
                <Header title="Post Details" showBack actionButton={editButton}/>
                <main className={styles.postContent}>
                    <DataBoundary isLoading={isLoading} error={error} errorMessage={ERROR_MESSAGE}>
                        {post && (
                            <>
                                <h1>{post.title}</h1>
                                <p>{post.body}</p>
                            </>)
                        }
                    </DataBoundary>
                </main>
            </div>
        </>
    );
}
