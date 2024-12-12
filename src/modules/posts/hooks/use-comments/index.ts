import { CommentsType } from "../../types";
import { apiAuth } from "../../../../shared/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parsedToken } from "../../../../shared/lib/parse-token";
import { toast } from "react-toastify";

const userInfo = parsedToken();

const fetchComments = async (postId: number): Promise<CommentsType[]> => {
  const { data } = await apiAuth.get<CommentsType[]>(
    `posts/${postId}/comments`,
  );
  return data;
};

const addComment = async ({
  postId,
  comment,
}: {
  postId: number;
  comment: Partial<CommentsType>;
}): Promise<CommentsType> => {
  const userId = userInfo?.userId;
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const { data } = await apiAuth.post<CommentsType>(
    `posts/${postId}/comments`,
    { ...comment, userId },
  );
  return data;
};

const deleteComment = async (commentId: number): Promise<void> => {
  await apiAuth.delete(`posts/comments/${commentId}`);
};

export const useComments = (postId: number) => {
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<CommentsType[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const addCommentMutation = useMutation<
    CommentsType,
    Error,
    { postId: number; comment: Partial<CommentsType> }
  >({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add comment: ${error.message}`);
    },
  });

  const deleteCommentMutation = useMutation<void, Error, number>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete comment: ${error.message}`);
    },
  });

  return {
    comments,
    isLoading,
    isError,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
};
