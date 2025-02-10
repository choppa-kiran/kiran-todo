import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { Task } from '../../model/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../../modal/edit-task/edit-task.component';
import { DeleteTaskComponent } from '../../modal/delete-task/delete-task.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-category-task',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './category-task.component.html',
  styleUrl: './category-task.component.css'
})
export class CategoryTaskComponent {
  infoVisible = signal(false);
  status = signal<string>('');
  task = input.required<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  private intervalId: any;
  private todoService = inject(TodoService);

  constructor(private matDialog: MatDialog, private snackbar : MatSnackBar) {}

  ngOnInit() {
    this.checkOverdueStatus(); 
    if (!this.task().completed) {
      this.intervalId = setInterval(() => this.checkOverdueStatus(), 1000);
    } 
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); 
  }

  checkOverdueStatus() {
    const currentDate = signal<string>(new Date().toISOString());
    const currentTime = signal<string>(
      new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    const taskDueDate = signal<string>(String(this.task().dueDate));
    const taskDueTime = signal<string>(String(this.task().dueTime || '00:00:00'));

    if (this.task().completed) {
      this.status.set('completed');
    } else if (taskDueDate() < currentDate()) {
      if (taskDueTime() < currentTime()) {
        this.status.set('overdue');
      } else {
        this.status.set('upcoming');
      }
    } else {
      this.status.set('upcoming');
    }
  }

  onArrowClick() {
    this.infoVisible.set(!this.infoVisible());
  }

  onCheckboxChange(event: Event) {
    const isCompleted = (event.target as HTMLInputElement).checked
    const updatedTask = { ...this.task(), completed: isCompleted }
    this.taskUpdated.emit(updatedTask)
    this.checkOverdueStatus()
  }

  deleteTask() {
    let dialogRef = this.matDialog.open(DeleteTaskComponent, {
      width: '300px',
      data: {task: this.task()},
      })

    dialogRef.afterClosed().subscribe(
          (results) => {
            this.snackbar.open('Task Deleted Successfully', '', {
              duration: 1500,
              panelClass: 'danger'
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        )
  }

  editTask(event: Event) {
    let dialogRef = this.matDialog.open(EditTaskComponent, {
      width: '80%',
      data: {task: this.task(), action: 'edit'},
      })

    dialogRef.afterClosed().subscribe(
          (results) => {
            this.snackbar.open('Task Updated Successfully', '', {
              duration: 1500,
              panelClass: 'success'
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        )
      }
}
