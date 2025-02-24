import Link from 'next/link';
import styles from './Header.module.css';
import {ReactNode} from 'react';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    actionButton?: ReactNode;
}

export const Header = ({title, showBack, actionButton}: HeaderProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.topRow}>
                <div className={styles.leftItems}>
                    {showBack && (
                        <Link href="/" className={styles.backLink}>
                            {"<- Back"}
                        </Link>
                    )}
                    <h1>{title}</h1>
                </div>

                {actionButton}
            </div>
        </div>
    );
};
