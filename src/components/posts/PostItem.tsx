import Link from 'next/link';
import { FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/common/Button';
import { Post } from '@/types/post';
import styles from './PostItem.module.css';

interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
}

export function PostItem({ post, onDelete }: PostItemProps) {
  
  const handleDeleteClick = () => {
    onDelete(post.id);
  };

  return (
    <div className={styles.postsItem}>
      <div className={styles.postHeader}>
        <h2>{post.title}</h2>
        <Button onClick={handleDeleteClick} variant="delete">
          <FiTrash2 size={18} />
        </Button>
      </div>

      <div className={styles.postBody}>
        <p>{post.body}</p>
      </div>

      <div className={styles.postFooter}>
        <Link href={`/posts/${post.id}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
