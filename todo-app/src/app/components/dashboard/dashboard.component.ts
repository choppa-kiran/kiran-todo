import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NewTaskComponent } from "../new-task/new-task.component";
import { RouterOutlet } from '@angular/router';
import { WelcomeCardComponent } from "../welcome-card/welcome-card.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, NewTaskComponent, RouterOutlet, WelcomeCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  
}
