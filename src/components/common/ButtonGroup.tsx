import {ReactNode} from 'react';
import styles from './ButtonGroup.module.css';

interface ButtonGroupProps {
    children: ReactNode;
}

export const ButtonGroup = ({children}: ButtonGroupProps) => {
    return (
        <div className={styles.buttonGroup}>
            {children}
        </div>
    );
}; 