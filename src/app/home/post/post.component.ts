import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { REACTIONS } from '../../constants/reactions.constants';
import { PostService } from '../../services/post.service';
import { GetPost } from '../../components/types/post.type';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { ReactionServive } from '../../services/reaction.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnChanges {
  constructor(private postService: PostService, private reactionService: ReactionServive, 
    private authService: AuthService, private notificationService: NotificationService) { }
  @Input() post: GetPost;
  public reactions = REACTIONS;


  ngOnInit(): void {

  }

  ngOnChanges() {
    console.log(this.post)
  }

  public react(reaction: string) {
    this.reactionService.react(reaction, this.authService.getUser(), this.post).then(() => {
      this.notificationService.createNotification(`"${this.authService.getUser().displayName} reacted to your post using ${reaction}"`,
       "REACT", this.post.data.userId);
    });
  }

  public deletePost() {
    this.postService.deletePost(this.post.reference);
  }

}
