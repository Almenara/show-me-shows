import { Subscription } from 'rxjs';
import { TmdbService } from './../../services/tmdb.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  
  private tmdbService: TmdbService = inject(TmdbService);
  private subscriptions: Subscription = new Subscription();
  public movies: any[] = [];


  ngOnInit(): void {
    this.subscriptions.add(
      this.tmdbService.getMolvieList().subscribe((response: any) => {
        this.movies = response.results;
      })
    );  

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
