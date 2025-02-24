import { PostItem } from '@/components/posts/PostItem';
import { Header } from '@/components/common/Header';
import postsStyles from './Posts.module.css';
import Link from 'next/link';
import { Button } from '../common/Button';
import { usePostsStore } from '@/stores/postsStore';
import React, {useCallback, useEffect} from 'react';
import DataBoundary from "@/components/common/DataBoundary";


export function Posts() {
  const { posts, isLoading, error, fetchPosts, deletePost } = usePostsStore();

  useEffect(() => {
      fetchPosts();
  }, [fetchPosts]);


    const handleDelete = useCallback((id: number) => {
        deletePost(id);
    }, [deletePost]);

  const addButton = (<Link href="/posts/new">
    <Button variant="primary">
      Add
    </Button>
  </Link>);

  return (
    <div className={postsStyles.postscontainer}>
      <Header title="Posts" actionButton={addButton} />
      <DataBoundary isLoading={isLoading} error={error} errorMessage="Error occurred while fetching the posts">
      <div className={postsStyles.postsgrid}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onDelete={handleDelete}
          />
        ))}
      </div>
      </DataBoundary>
    </div>
  );
}
