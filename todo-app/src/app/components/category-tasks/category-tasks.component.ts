import { Component, inject, signal, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CategoryTaskComponent } from "../category-task/category-task.component";
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../../modal/edit-task/edit-task.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-category-tasks',
  standalone: true,
  imports: [CategoryTaskComponent, CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './category-tasks.component.html',
  styleUrl: './category-tasks.component.css'
})
export class CategoryTasksComponent {

  private category = signal<string | null>(null);
  private allTasks = signal<Task[]>([]);
  private todoService = inject(TodoService);
  filteredTasks = signal<Task[]>([]);
  selectedPriority = signal<string>('All');
  searchText = signal<string>('');
  
  constructor(private route: ActivatedRoute, private snackbar : MatSnackBar, private matDialog: MatDialog) {
  }
  
  ngOnInit() {
    this.getTasks();
    this.route.data.subscribe((data) => {
      this.category.set(data['category']); 
      this.filterTasks(); 
    });
  }

  getTasks() {
    this.allTasks.set(this.todoService.getTasks());
    this.filterTasks();
  }

  filterTasks() {
    const currentCategory = this.category();
    if (!currentCategory) return;

    const filtered = this.allTasks().filter(task => {
      const taskStatus = this.checkOverdueStatus(task);
      switch (currentCategory) {
        case 'All':
          return true;
        case 'Upcoming':
          return !task.completed && taskStatus === 'upcoming';
        case 'Overdue':
          return !task.completed && taskStatus === 'overdue';
        case 'Completed':
          return task.completed;
        default:
          return false;
      }
    });

    this.filteredTasks.set(filtered);
  }

  checkOverdueStatus(task: Task) {
    let status = '';
    const currentDate = signal<string>(new Date().toISOString());
    const currentTime = signal<string>(
      new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    const taskDueDate = signal<string>(String(task.dueDate));
    const taskDueTime = signal<string>(String(task.dueTime || '00:00:00'));

    if (task.completed) {
      status ='completed';
    } else if (taskDueDate() == currentDate()) {
      if (taskDueTime() < currentTime()) {
        status = 'overdue';
      } else {
        status ='upcoming';
      }
    } else if (taskDueDate() < currentDate()) {
      status = 'overdue';
    } else {
      status = 'upcoming';
    }
    return status;
  }

  openNewTask() {
    let dialogRef = this.matDialog.open(EditTaskComponent, {
          width: '80%',
          data: {task: null, action: 'add'},
          })
    dialogRef.afterClosed().subscribe(
      (results) => {
        this.getTasks();
      }
    )
  }
  
  updateTask(updatedTask: Task) {
    const updatedTasks = this.allTasks().map(task => 
      task.id === updatedTask.id ? { ...updatedTask } : task
    );
    this.allTasks.set(updatedTasks);
    this.todoService.updateTask(updatedTasks);
    this.filterTasks();
    this.snackbar.open('Task Complete status updated Successfully', '', {
      duration: 2000,
      panelClass: 'success'
    });
  }

  priorityFilter(priority: string) {
    this.selectedPriority.set(priority);
    this.searchText.set('');
    this.filterTasks();
    if (this.selectedPriority() === 'All') {
      return;
    }
    const filtered = this.filteredTasks().filter(task => task.priority === this.selectedPriority());
    this.filteredTasks.set(filtered);
  }

  searchTask() {
    const searchText = this.searchText().toLowerCase();
    this.filterTasks();
    this.priorityFilter(this.selectedPriority());
    const filtered = this.filteredTasks().filter(task => task.title.toLowerCase().includes(searchText));
    this.filteredTasks.set(filtered);
  }
}
