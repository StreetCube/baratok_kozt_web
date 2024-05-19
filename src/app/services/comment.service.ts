import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { CommentCreate } from "../components/types/comment.type";
import { doc, updateDoc } from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
  })
  export class CommentService {
  
    constructor(private fireStore: Firestore) { }


    public async createComment(formValue: CommentCreate) {
        const post = formValue.post;
        const postRef = post.reference
        delete formValue.post
        //Add the comment to the post
        await updateDoc(postRef, "comments",
            [...post.data.comments, formValue]
        )

        
    }
  }