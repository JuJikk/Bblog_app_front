import { Post } from "../../types";
import { apiAuth } from "../../../../shared/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parsedToken } from "../../../../shared/lib/parse-token";

const userData = parsedToken();

const fetchUserPosts = async (): Promise<Post[]> => {
  const { data } = await apiAuth.get<Post[]>("posts/my-posts", {
    params: { userId: userData?.userId },
  });
  return data;
};
const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiAuth.get<Post[]>("posts");
  return data;
};

const createPost = async (post: Partial<Post>): Promise<Post> => {
  const { data } = await apiAuth.post<Post>("posts", post);
  return data;
};

const updatePost = async (updatedPost: Post): Promise<Post> => {
  const { data } = await apiAuth.patch<Post>(
    `posts/${updatedPost.id}`,
      {updatedPost: updatedPost, user: userData?.userId },
  );
  return data;
};

const deletePost = async (id: number): Promise<void> => {
  await apiAuth.delete(`posts/${id}`, {
    data: { userId: userData?.userId },
  });
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: usersPosts } = useQuery<Post[], Error>({
    queryKey: ["UsersPosts"],
    queryFn: fetchUserPosts,
  });

  const addPostMutation = useMutation<Post, Error, Partial<Post>>({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const updatePostMutation = useMutation<Post, Error, Post>({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePostMutation = useMutation<void, Error, number>({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  return {
    posts,
    usersPosts,
    isLoading,
    isError,
    addPost: addPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
  };
};
