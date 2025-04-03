import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  public isMenuOpen: WritableSignal<boolean> = signal(false);

  public toggleMenu(): void {
    this.isMenuOpen.update((value: boolean) => !this.isMenuOpen());
  }

}
