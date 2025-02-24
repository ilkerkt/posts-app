import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {usePostsStore} from '@/stores/postsStore';

export function Notification() {
    const error = usePostsStore((state) => state.error);
    const success = usePostsStore((state) => state.success);

    useEffect(() => {
        if (error) {
            toast.error(error);
            usePostsStore.setState({error: null});
        }
    }, [error]);

    useEffect(() => {
        if (success) {
            toast.success(success);
            usePostsStore.setState({success: null});

        }
    }, [success]);

    return (<></>);
}
