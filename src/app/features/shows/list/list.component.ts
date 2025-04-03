import { Component, inject, Input } from '@angular/core';
import { Production } from '../../../models/production';
import { ShowComponent } from './components/show/show.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TmdbService } from '../../../services/tmdb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ShowComponent, PaginationComponent, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input('shows') public shows! : Production[];
  private tmdbService = inject(TmdbService);
  public page: number = 1;
  public totalPages: number = 12;

  public onPageChange(page: number) {
    this.page = page;
    this.tmdbService.showsCurrentPage = page;
  }
}
