import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-welcome-card',
  standalone: true,
  imports: [],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css'
})
export class WelcomeCardComponent {
  userName = signal<string>('User 1');
  currentDate = signal<string>(new Date().toDateString());
  currentTime = signal<string>(new Date().toLocaleTimeString());

  constructor() {
    effect(() => {
      setInterval(() => {
        this.currentTime.set(new Date().toLocaleTimeString());
      }, 1000);
    });
  }
}
