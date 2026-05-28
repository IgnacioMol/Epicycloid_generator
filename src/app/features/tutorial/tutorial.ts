import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const STORAGE_KEY = 'epicycloid_tutorial_seen';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tutorial.html',
  styleUrl: './tutorial.css',
})
export class Tutorial {
  visible = !localStorage.getItem(STORAGE_KEY);
  dontShowAgain = false;

  open(): void {
    this.dontShowAgain = false;
    this.visible = true;
  }

  close(): void {
    if (this.dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, '1');
    }
    this.visible = false;
  }
}
