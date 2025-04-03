import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoverComponent } from '../../../../../shared/components/cover/cover.component';
import { Production } from '../../../../../models/production';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CoverComponent, RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {
  @Input('show') public show! : Production;
}
