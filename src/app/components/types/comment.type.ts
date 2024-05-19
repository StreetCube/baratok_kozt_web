import { GetPost } from "./post.type";

export interface CommentCreate {
    content: string;
    post: GetPost;
    author: string;
}