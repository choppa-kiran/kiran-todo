import { Component, DestroyRef, inject, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Notification } from '../../model/notification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private todoService = inject(TodoService);
  viewDropDown = signal(false);
  viewNotification = signal(false);
  notifications = signal<Notification[]>([]);
  newNotification = signal(false);

  constructor() {
    this.reloadNotification();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.reloadNotification();
    }, 300000);
  }

  reloadNotification() {
    this.notifications.set([]);
    this.notifications.set(this.todoService.getNotifications());
    for (let notificatin of this.notifications()) {
      if (notificatin.is_viewed == false) this.newNotification.set(true);
    }
  }

  onViewNotification(event: Event) {
    this.newNotification.set(false);
    event.stopPropagation();

    if (this.viewNotification()) {
      this.viewNotification.set(false);
      window.removeEventListener('click', this.closeViewNotification);
    } else {
      this.viewNotification.set(true);
      window.addEventListener('click', this.closeViewNotification.bind(this));
    }
  }

  closeViewNotification() {
    this.viewNotification.set(false);
    window.removeEventListener('click', this.closeViewNotification.bind(this));
  }

  readNotification(notification_id: number, index: number) {
    this.notifications()[index].is_viewed = true;

    this.todoService.saveNotifications(this.notifications());
  }

}
