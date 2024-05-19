import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../types/notification.type';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, OnDestroy {
  public notifications: Notification[] = null
  private destroyed$ = new Subject<void>();

  constructor(public notificationService: NotificationService) {

  }
ngOnInit(): void {
    this.notificationService.getNotifications();
    this.notificationService.notificationSubject.pipe(takeUntil(this.destroyed$)).subscribe((notifications: Notification[]) => {
      console.log(notifications)
      this.notifications = notifications;
    })
}

ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}

public closeNotification(notification: Notification) {
  this.notificationService.closeNotification(notification);
}
}
