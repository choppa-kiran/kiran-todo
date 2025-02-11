import { ChangeDetectionStrategy, Component, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../model/task.model';
import { taskDialog } from '../../model/taskDialog.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { provideNativeDateAdapter } from "@angular/material/core"
import { Time } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class EditTaskComponent {

  private todoService = inject(TodoService);
  priorityLevels = ['Low', 'Medium', 'High'];
  action: string = '';
  task: Task | null = null;

  @ViewChild('addNewDiv') addNewDiv!: ElementRef;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: taskDialog, private dialogRef: MatDialogRef<EditTaskComponent>, private snackbar : MatSnackBar) { }

  ngAfterViewInit() {
    this.addNewDiv.nativeElement.addEventListener(
      'click',
      this.closeDiaLog.bind(this)
    );
  }

  taskForm = new FormGroup({
      title: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>('', Validators.required),
      dueDate: new FormControl<Date | null>(null, Validators.required),
      dueTime: new FormControl<Time | null>(null, Validators.required),
      priority: new FormControl<'Low' | 'Medium' | 'High' | null>(null, Validators.required),
    });

  ngOnInit() {
    this.task = this.data.task;
    this.action = this.data.action;

    if (this.action === 'edit') {
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
        dueDate: this.task.dueDate,
        dueTime: this.task.dueTime,
        priority: this.task.priority,
      });
    }
  }

  closeDiaLog(event: Event) {
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm && !applicationForm.contains(event.target as Node)) {
    }
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      if (this.action === 'edit') {
        this.todoService.editTask({
          id: this.task!.id,
          title: formData.title!,
          description: formData.description!,
          dueDate: formData.dueDate!,
          dueTime: formData.dueTime!,
          priority: formData.priority!,
          completed: this.task!.completed,
        });
        this.snackbar.open('Task Updated Successfully', '', {
          duration: 2000,
          panelClass: 'success'
        });
      } else {
        this.todoService.addTask({
          id: 0,
          title: formData.title!,
          description: formData.description!,
          dueDate: formData.dueDate!,
          dueTime: formData.dueTime!,
          priority: formData.priority!,
          completed: false,
        });
        this.snackbar.open('Task Added Successfully', '', {
          duration: 2000,
          panelClass: 'success'
        });
      }
      this.dialogRef.close();
    }
  }
}
