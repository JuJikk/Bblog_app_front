import React from "react";
import { usePosts } from "../../modules/posts/hooks/use-posts";
import { PostForm } from "../../modules/posts/ui/post-form";
import { PostList } from "../../modules/posts/ui/post-list";
import { Post } from "../../modules/posts/types";

export const DashboardPage: React.FC = () => {
  const { usersPosts, addPost, deletePost, updatePost } = usePosts();
  const handleEdit = (updatedPost: Post) => {
    updatePost(updatedPost);
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
      <PostForm onSubmit={(data) => addPost({ ...data })} />
      <PostList
        posts={usersPosts ?? []}
        onDelete={deletePost}
        onEdit={handleEdit}
      />
    </div>
  );
};
