import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ToastContainer} from 'react-toastify';
import {Notification} from "@/components/common/Notification";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer/>
            <Notification/>
        </>
    );
}
