import { Component, ChangeDetectionStrategy, inject, signal, ViewChild, ElementRef } from "@angular/core"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatCardModule } from "@angular/material/card"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { provideNativeDateAdapter } from "@angular/material/core"
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { TodoService } from "../../services/todo.service"
import { Time } from "@angular/common"
import { Task } from "zone.js/lib/zone-impl"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"

@Component({
  selector: "app-new-task",
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
    MatSnackBarModule,
  ],
  templateUrl: "./new-task.component.html",
  styleUrl: "./new-task.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent {

  private todoService = inject(TodoService);
  addNew = signal(false);
  priorityLevels = ['Low', 'Medium', 'High'];

  taskForm = new FormGroup({
    title: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>('', Validators.required),
    dueDate: new FormControl<Date | null>(null, Validators.required),
    dueTime: new FormControl<Time | null>(null, Validators.required),
    priority: new FormControl<'Low' | 'Medium' | 'High' | null>(null, Validators.required),
  });

  @ViewChild('addNewDiv') addNewDiv!: ElementRef;

  constructor(private snackbar : MatSnackBar) {}

  ngAfterViewInit() {
    this.addNewDiv.nativeElement.addEventListener(
      'click',
      this.closeForm.bind(this)
    );
  }

  onToggle(event: Event) {
    event.stopPropagation();
    this.addNew.set(!this.addNew());
    if (this.addNew()) {
      this.taskForm.reset();
    }
  }

  closeForm(event: Event) {
    const applicationForm = document.querySelector('.application-form');
    if (applicationForm && !applicationForm.contains(event.target as Node)) {
      this.addNew.set(false);
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.todoService.addTask({
        id: 0,
        title: formData.title!,
        description: formData.description!,
        dueDate: formData.dueDate!,
        dueTime: formData.dueTime!,
        priority: formData.priority!,
        completed: false,
      });

      this.snackbar.open('New Task Added Successfully', '', {
        duration: 1500,
        panelClass: 'success'
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }
}
