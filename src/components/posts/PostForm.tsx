import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/common/Button";
import {ButtonGroup} from "@/components/common/ButtonGroup";
import styles from "./PostForm.module.css";
import {PostFormInputs, postFormSchema} from "@/types/post";


interface PostFormProps {
    initialValues: PostFormInputs;
    onSubmit: (data: PostFormInputs) => void;
    onCancel: () => void;
    submitLabel?: string;
}

export function PostForm({initialValues, onSubmit, onCancel, submitLabel = "Submit"}: PostFormProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<PostFormInputs>({
        defaultValues: initialValues,
        resolver: zodResolver(postFormSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title" {...register("title")} />
                {errors.title && (
                    <p className={styles.errorMessage}>{errors.title.message}</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="body">Body</label>
                <textarea id="body" rows={5} {...register("body")} />
                {errors.body && (
                    <p className={styles.errorMessage}>{errors.body.message}</p>
                )}
            </div>

            <ButtonGroup>
                <Button type="submit" variant="primary">
                    {submitLabel}
                </Button>
                <Button variant="secondary" type="button" onClick={onCancel}>
                    Cancel
                </Button>
            </ButtonGroup>
        </form>
    );
}
