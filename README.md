# Todo App

Demo Link: https://kiran-todo-o0oq7f92z-kenkanaki66-gmailcoms-projects.vercel.app/

# Tools Used

- Angular
- Angular material library

# Features

**Dash Board**

![](todo-app/src/assets/demo/dashboard1.png)

This is the User Interface

**New Task Creation**

![](todo-app/src/assets/demo/newTask1.png)

New Task modal

![](todo-app/src/assets/demo/newTaskSnackbar1.png)

SnackBar is shown at the bottom on successfully adding a new task

**Edit Task**

![](todo-app/src/assets/demo/editTask1.png)

Edit task modal automatically fills the data for editing

**Delete Task**

![](todo-app/src/assets/demo/delete1.png)

Delete confirmation pop up when deleting a task

**Task Status**

![](todo-app/src/assets/demo/status1.png)

Overdue status automatically updates in realtime

![](todo-app/src/assets/demo/completed1.png)

The task status us updated to completed by clicking on the check box

**Task Search**

![](todo-app/src/assets/demo/search1.png)

A task can be searched by typing the title in the search bar

**Status Filter**

![](todo-app/src/assets/demo/upcomingFilter1.png)
![](todo-app/src/assets/demo/overdueFilter1.png)
![](todo-app/src/assets/demo/completedFilter1.png)

Filters based on status

**Priority Filter**

![](todo-app/src/assets/demo/priorityFilter1.png)

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
