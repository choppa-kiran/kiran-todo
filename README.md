# Tools Used

- Angular
- Angular material library

# Features

**Dash Board**

![](todo-app/src/assets/demo/dashboard.png)

This is the User Interface

**New Task Creation**

![](src/assets/demo/newTask.png)

New Task modal

![](src/assets/demo/newTaskSnackbar.png)

SnackBar is shown at the bottom on successfully adding a new task

**Edit Task**

![](src/assets/demo/editTask.png)

Edit task modal automatically fills the data for editing

**Delete Task**

![](src/assets/demo/delete.png)

Delete confirmation pop up when deleting a task

**Task Status**

![](src/assets/demo/status.png)

Overdue status automatically updates in realtime

![](src/assets/demo/completed.png)

The task status us updated to completed by clicking on the check box

**Task Search**

![](src/assets/demo/search.png)

A task can be searched by typing the title in the search bar

**Status Filter**

![](src/assets/demo/upcomingFilter.png)
![](src/assets/demo/overdueFilter.png)
![](src/assets/demo/completedFilter.png)

Filters based on status

**Priority Filter**

![](src/assets/demo/priorityFilter.png)

Tasks can be filtered in each status filters based on their priority

# Local Setup

For local setup first clone the github repo

`https://github.com/choppa-kiran/kiran-todo.git`

Navigate to project directory

`cd todo-app`

Install AngularCli
`npm install -g @angular/cli@17`

Add Angular Material library
`ng add @angular/material`

Install Snackbar library
`npm install @angular/material @angular/cdk`

Run the application
`npm start`
