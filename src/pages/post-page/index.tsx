import React from "react";
import { usePosts } from "../../modules/posts/hooks/use-posts";
import { PostList } from "../../modules/posts/ui/post-list";

export const PostsPage: React.FC = () => {
  const { posts = [] } = usePosts();

  return (
    <div className="container mx-auto p-4">
      <PostList posts={posts}/>
    </div>
  );
};
