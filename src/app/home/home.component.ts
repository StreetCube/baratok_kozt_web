import { Component } from '@angular/core';
import { PostCreate } from '../components/types/post.type';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  public posts = this.postService.postChangedSubject; //TODO type

  constructor(private postService: PostService) { }
  public postFormDisplayed = false;

  public displayPostForm() {
    this.postFormDisplayed = true
    this.posts.subscribe((posts) => {
      console.log(posts)
    })
  }

  public hidePostForm() {
    this.postFormDisplayed = false
  }

  createNewPost(post: PostCreate) {
    this.postService.createPost(post)
      .then(() => {
        this.postFormDisplayed = false;
      })
      .catch((error) => {
        console.error('Error creating post', error);
      });
  }
}
