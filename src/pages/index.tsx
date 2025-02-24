import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {Posts} from "@/components/posts/Posts";

export default function Home() {
    return (
        <>
            <Head>
                <title>Posts app</title>
                <meta name="description" content="Posts app to view, create, edit and remove posts "/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <Posts/>
            </main>
        </>
    );
}
