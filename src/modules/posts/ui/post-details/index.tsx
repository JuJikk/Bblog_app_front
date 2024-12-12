import React from "react";
import { Divider } from "@nextui-org/react";
import { CommentsType, Post } from "../../types";
import { CommentForm } from "../comment-form";

interface PostDetailsProps {
  post: Post;
  comments: CommentsType[];
  onAddComment: (text: string) => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  comments,
  onAddComment,
}) => (
  <div>
    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
    <p className="text-gray-700 mb-6">{post.content}</p>

    <Divider className="my-6" />

    <div>
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-3 bg-gray-100 rounded-lg">
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>

    <CommentForm onAddComment={onAddComment} />
  </div>
);
