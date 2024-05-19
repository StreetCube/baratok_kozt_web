import { FormControl } from "@angular/forms";
import { GetPost } from "./post.type";

export interface createPostForm {
    title: FormControl<string>
    content: FormControl<string>
    images: FormControl<string[]>
}

export interface createCommentForm {
    content: FormControl<string>
    post: FormControl<GetPost>
    author: FormControl<string>
}