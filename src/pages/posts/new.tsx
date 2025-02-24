import Head from "next/head";
import {useRouter} from "next/router";
import {PostForm} from "@/components/posts/PostForm";
import {Header} from "@/components/common/Header";
import styles from "@/styles/PostDetail.module.css";
import { PostFormInputs} from "@/types/post";
import {usePostsStore} from "@/stores/postsStore";
import DataBoundary from "@/components/common/DataBoundary";

const TITLE = "Create New Post";
const ERROR_MESSAGE = "Error occurred while creating post."
export default function NewPost() {
    const router = useRouter();
    const {createPost, isLoading, error} = usePostsStore();

    const handleCreate = (data: { title: string; body: string }) => {
        const newPost: PostFormInputs = {
            title: data.title,
            body: data.body,
        };
        createPost(newPost);
        router.push("/");
    };

    const handleCancel = () => {
        return () => router.push("/");
    }

    return (
        <>
            <Head>
                <title>Create New Post</title>
            </Head>

            <div className={styles.container}>
                <Header title={TITLE} showBack/>
                <DataBoundary isLoading={isLoading} error={error} errorMessage={ERROR_MESSAGE}>
                    <PostForm initialValues={{title: "", body: ""}} onSubmit={handleCreate} onCancel={handleCancel}
                              submitLabel="Create"/>
                </DataBoundary>
            </div>
        </>
    );
}
