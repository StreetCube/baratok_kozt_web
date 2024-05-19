import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { GetPost } from '../../../../components/types/post.type';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrl: './view-comment.component.css'
})
export class ViewCommentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() post: GetPost;
  @Input() panel: MatExpansionPanel;
  public comments = []
  private destroy$ = new Subject<void>()
  expandedPanel = false

  constructor() { }
  ngOnInit(): void {
    this.subscribeToPanelChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.comments = this.post.data.comments;
      if(this.expandedPanel) {
        this.panel.expanded = true
      } else {
        this.panel.expanded = false
      }
      
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private subscribeToPanelChanges() {
    this.panel.expandedChange.pipe(takeUntil(this.destroy$)).subscribe((expanded) => {
      this.expandedPanel = expanded
    })
  }

}
