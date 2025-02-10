import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { taskDialog } from '../../model/taskDialog.model';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {

  private todoService = inject(TodoService);
    task: Task | null = null;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: taskDialog, private dialogRef: MatDialogRef<DeleteTaskComponent>,) { }

  ngOnInit() {
    this.task = this.data.task;
  }

  onCancel(event: Event) {
    this.dialogRef.close();
  }

  onConfirm(event: Event) {
    if (this.task) {
      this.todoService.deleteTask(this.task.id);
    }
    this.dialogRef.close();
  }
}
