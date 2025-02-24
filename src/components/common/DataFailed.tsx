import styles from "./DataFailed.module.css";

interface MessageProps {
    message: string;
}

export default function DataFailed({message}: MessageProps) {
    return (
        <div className={styles.container}>
            <p className={styles.message}>{message}</p>
        </div>
    );
}