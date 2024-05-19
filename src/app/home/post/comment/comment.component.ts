import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { GetPost } from '../../../components/types/post.type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { createCommentForm } from '../../../components/types/form.types';
import { CommentCreate } from '../../../components/types/comment.type';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit, OnChanges {

  @Input()comments: Comment[] = [];
  @Input()post: GetPost;
  public form: FormGroup<createCommentForm>;

  constructor(private commentService: CommentService, private authService: AuthService) {
   }

   ngOnInit(): void {
      this.initForm();
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.form?.controls.post.setValue(this.post)
   }

   private initForm() {
      this.form = new FormGroup({
        content: new FormControl('', [Validators.required]),
        post: new FormControl(this.post),
        author: new FormControl(''),
      })
   }

   public createComment() {
    this.form.controls.author.setValue(this.authService.getUser().displayName);
    this.form.controls.post.setValue(this.post);
      if(this.form.invalid) {
        return;
      }
      this.commentService.createComment(this.form.value as CommentCreate).then(() => {
        this.form.reset();
      })
   }
}
 