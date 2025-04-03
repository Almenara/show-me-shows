import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [],
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.scss'
})
export class CoverComponent {
   @Input('poster_path') public poster_path! : string | null;
}
