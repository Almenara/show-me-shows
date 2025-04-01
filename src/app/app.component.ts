import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from "./core/main/main.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainComponent],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'show-me-shows';
}
