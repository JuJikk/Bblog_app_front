import { Post } from "../../types";
import { apiAuth } from "../../../../shared/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPost = async (postId: number): Promise<Post> => {
    const { data } = await apiAuth.get<Post>(`posts/${postId}`);
    return data;
};

export const usePost = (postId: number) => {
    const queryClient = useQueryClient();

    const {
        data: post,
        isLoading,
        isError,
    } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchPost(postId),
    });

    return {
        post,
        isLoading,
        isError,
        invalidatePost: () =>
            queryClient.invalidateQueries({ queryKey: ["post", postId] }),
    };
};
