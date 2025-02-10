import { Injectable } from '@angular/core';
import { Notification } from '../model/notification.model';
import { Time } from '@angular/common';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  addTask(task: Task) {
    let tasks = this.getTasks();
    if (this.getTasks().length != 0) { 
      task.id = tasks[tasks.length - 1].id + 1;
    }
    tasks = [...tasks, task];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  saveNotifications(notifications: Notification[]) {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }

  getNotifications() {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  updateTask(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  editTask(task: Task) {
    let tasks = this.getTasks();
    tasks = tasks.map((t: Task) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(id: number) {
    let task= this.getTasks().find((task: Task) => task.id === id);
    if (task) {
      const updatedTasks = this.getTasks().filter((task: Task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }
}
