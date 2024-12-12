export interface Post {
    id: number;
    title: string;
    content: string;
    user: {
        email: string;
        id: string;
    }
}

export interface CommentsType {
    id: number;
    postId: number;
    content: string;
}
