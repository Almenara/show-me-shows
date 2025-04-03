import { Subscription } from 'rxjs';
import { TmdbService } from './../../services/tmdb.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../shows/list/list.component';
import { ProductionPreview } from '../../models/production';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  private tmdbService: TmdbService = inject(TmdbService);
  private subscriptions: Subscription = new Subscription();
  public shows!: ProductionPreview[];


  ngOnInit(): void {
    this.subscriptions.add(
      this.tmdbService.showList$.subscribe((shows: ProductionPreview[]) => {
        this.shows = shows;
      })
    );  
    this.tmdbService.getShowsList();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
