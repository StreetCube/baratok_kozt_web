import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPostForm } from '../../components/types/form.types';
import { PostCreate } from '../../components/types/post.type';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageDialogComponent } from '../../dialogs/upload-image-dialog/upload-image-dialog.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  @Output() postFormClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() postCreated: EventEmitter<PostCreate> = new EventEmitter<PostCreate>();
  public form: FormGroup<createPostForm>; //TODO
  formBuilder: FormBuilder = inject(FormBuilder);
  dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      content: this.formBuilder.control('', Validators.required),
      images: this.formBuilder.control([]),
    });
  }

  public closePostForm() {
    this.postFormClosed.emit();
  }

  public createPost() {
    if(this.form.valid) {
      this.postCreated.emit(this.form.value as PostCreate);
    }
  }

  public uploadImage() {
    this.dialog.open(UploadImageDialogComponent, {
    });
  }
}
