import { Component, signal } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  tabs = ['Dashboard', 'Upcoming', 'Overdue', 'Completed'];
  isVisible = signal(false);

  closeSidebarHandler: (event: Event) => void;

  constructor() {
    this.closeSidebarHandler = this.closeSideBar.bind(this);
  }

  toggleBtn() {
    if (!this.isVisible()) {
      this.isVisible.set(true);
      document.addEventListener('click', this.closeSidebarHandler);
    }
  }

  closeSideBar(event: Event) {
    const clickedOnToggleBtn = (event.target as HTMLElement).classList.contains(
      'toggle-btn'
    );
    if (!clickedOnToggleBtn) {
      this.isVisible.set(false);
      document.removeEventListener('click', this.closeSidebarHandler);
    }
  }
}
