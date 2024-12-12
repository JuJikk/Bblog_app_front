import React from "react";
import { useParams } from "react-router-dom";
import {useComments} from "../../modules/posts/hooks/use-comments";
import { PostDetails } from "../../modules/posts/ui/post-details";
import {usePost} from "../../modules/posts/hooks/use-post";

export const PostDetailsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId); // Перетворення в число

  const { post, isLoading: postLoading } = usePost(numericPostId);
  const { comments, isLoading: commentsLoading, addComment } =
      useComments(numericPostId);

  const handleAddComment = (content: string) => {
    addComment({ postId: numericPostId, comment: { content } });
  };

  if (postLoading || commentsLoading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
      <PostDetails
          post={post}
          comments={comments || []}
          onAddComment={handleAddComment}
      />
  );
};
