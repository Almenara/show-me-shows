import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductionPreview } from '../../../models/production';
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
export class ListComponent implements OnInit {
  @Input('shows') public shows! : ProductionPreview[];
  private tmdbService = inject(TmdbService);
  public page: number = 1;
  public totalPages: number = 12;

  ngOnInit(): void {
    this.page = this.tmdbService.showsCurrentPage;
  }

  public onPageChange(page: number) {
    this.page = page;
    this.tmdbService.showsCurrentPage = page;
  }
}
