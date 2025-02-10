import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryTaskComponent } from './components/category-task/category-task.component';
import { CategoryTasksComponent } from './components/category-tasks/category-tasks.component';

export const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
			children: [
				{
					path: '',
					component: CategoryTasksComponent,
					data: { category: 'All' }
				},
				{
					path: 'upcoming', 
					component: CategoryTasksComponent, 
					data: { category: 'Upcoming' } 
				},
				{ 
					path: 'overdue', 
					component: CategoryTasksComponent, 
					data: { category: 'Overdue' } 
				},
				{ 
					path: 'completed', 
					component: CategoryTasksComponent, 
					data: { category: 'Completed' } 
				},
			]
	},
	
];
