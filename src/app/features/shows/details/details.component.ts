import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CoverComponent } from '../../../shared/components/cover/cover.component';
import { Production } from '../../../models/production';
import { Subscription } from 'rxjs';
import { TmdbService } from '../../../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CoverComponent, PaginationComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy { 
  private subscriptions = new Subscription();
  private tmdbService: TmdbService = inject(TmdbService);
  private activatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  public show: Production | null = null;
  public iframeVideoUrl: string = '';
  public recommendations: Production[] = [];

  ngOnInit(): void {
    //obtenemos el id de routes
    const id = this.activatedRoute.snapshot.params['id'];

    this.tmdbService.getShowDetail(id);
    this.subscriptions.add(
      this.tmdbService.show$.subscribe((show: Production | null) => {
        this.show = show;
        if(this.show){
          if(this.show.videos && this.show.videos.length > 0){
            this.loadVideo();
          }
          this.tmdbService.getRecommendations(id);
        }
      })
    );
    this.subscriptions.add(
      this.tmdbService.recommendations$.subscribe((response: any[]) => {
        this.recommendations = response;
      })
    );
  }
  public getVideoUrl(site: 'YouTube' | 'Vimeo' | 'Dailymotion', key: string): string {
    //creamos un array de sitios de los que puede TMDB obtener videos con su URL
    const sites = {
      'YouTube': 'https://www.youtube.com/embed/',
      'Vimeo': 'https://vimeo.com/',
      'Dailymotion': 'https://www.dailymotion.com/embed/video/'
    };
    this.iframeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sites[site] + key) as string;
    return this.iframeVideoUrl;
  }
  
  public loadVideo(index:number = 1):void {
    index = index - 1;
    if(this.show && this.show.videos && this.show.videos.length > 0){
      const video = this.show.videos[index];
      if(video.site === 'YouTube' || video.site === 'Vimeo' || video.site === 'Dailymotion')
      this.iframeVideoUrl = this.getVideoUrl(video.site, video.key ) as string;  
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
   
}
