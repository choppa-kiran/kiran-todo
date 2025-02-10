**Question: - How long did you spend on the coding test?**

Following is approx break of time taken.

Approx time taken for each stage:

Layout planing: 20min
Components and routs creating: 3 hours
Functionality addition: 2 hours
Testing and debugging: 2 hours
Demo preperation: 40 min
Total: 8 hours

---

**Question: - What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.**

In Angular 17, Signals were introduced as a major feature to enhance reactivity and optimize change detection. Signals allow developers to track and respond to state changes efficiently without relying on RxJS observables or ChangeDetectionStrategy.OnPush.

With signals, Angular detects changes only when a signal's value updates, reducing unnecessary re-renders and improving performance.

I have used signals in almost all of my components.

In category-task.component.ts

```
status = signal<string>('');
checkOverdueStatus() {
    const currentDate = signal<string>(new Date().toISOString());
    const currentTime = signal<string>(
      new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    );
    const taskDueDate = signal<string>(String(this.task().dueDate));
    const taskDueTime = signal<string>(String(this.task().dueTime));

    if (this.task().completed) {
      this.status.set('completed');
    } else if (taskDueDate() < currentDate()) {
      if (taskDueTime() < currentTime()) {
        console.log(taskDueTime(), currentTime());
        this.status.set('overdue');
      } else {
        this.status.set('upcoming');
      }
    } else {
      this.status.set('upcoming');
    }
  }
```

---

**Question:- If you had more time, what additional features or improvements would you consider adding to the task management application?**

If I had more time, I would consider adding the following features to improve the task management application:

- Notification Functionality
  Implement real-time notifications to alert users about due tasks, upcoming deadlines, or task assignments.
  Use Push Notifications (via WebSockets or Firebase Cloud Messaging) for better engagement.

- Cloud-Based Storage
  Instead of relying on local storage, I would integrate a cloud-based database like Firebase, Supabase, or a backend API to store tasks.
  This would allow users to access their tasks from multiple devices seamlessly.

- Task Categorization & Subsections
  Add a feature to group tasks into subcategories (e.g., "Work", "Personal", "Shopping").
  This would help users organize and manage their workload more efficiently.
