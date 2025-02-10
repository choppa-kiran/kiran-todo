import {
  AfterViewInit,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent {
  title = input.required<string>();
  image = computed(() => `/assets/${this.title().toLowerCase()}.svg`);
  link = computed(() =>
    this.title() === 'Dashboard' ? '' : `/${this.title().toLowerCase()}`
  );
}
