import {ButtonHTMLAttributes} from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "delete";
}

export const Button = ({children, variant = "primary", className, ...props}: ButtonProps) => (
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
        {children}
    </button>
); 