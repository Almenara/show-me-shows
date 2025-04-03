import { BehaviorSubject, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductionResponse, VideosResponse } from '../models/production-response';
import { Production, ProductionPreview, Video } from '../models/production';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private http: HttpClient = inject(HttpClient);
  private apiKey: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWE2Zjk2OGRhZTk5NGE1YjY3YWI5MWYxNDVkNWIzNCIsIm5iZiI6MTc0MzYxOTkzNC41Mzc5OTk5LCJzdWIiOiI2N2VkODc1ZTgzNmM4ZWRhN2NhYjA1ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zyoi-jnYB8DgZOenh1w7Tjzr0DtXEZXLiJCxDykvhOs';
  private headers: {
    Accept: string,
    Authorization: string
  } = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.apiKey}`,
  }

  private showsCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  set showsCurrentPage(page: number) {
    this.showsCurrentPage$.next(page);
    this.getShowsList();
  }
  get showsCurrentPage(): number {
    return this.showsCurrentPage$.getValue();
  }

  private showList: BehaviorSubject<ProductionPreview[]> = new BehaviorSubject<ProductionPreview[]>([]);
  get showList$(): Observable<ProductionPreview[]> {
    return this.showList.asObservable();
  }

  private show: BehaviorSubject<Production | null> = new BehaviorSubject<Production | null>(null);
  get show$(): Observable<Production | null> {
    return this.show.asObservable();
  }

  private recommdantionCurrentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  set recommdantionCurrentPage(page: number) {
    this.recommdantionCurrentPage$.next(page);
    if(this.show.getValue()!== null){
      const currentShow = this.show.getValue()?.id;
      if (currentShow) {
        this.getRecommendations(currentShow);
      }
    }
  }
  get recommdantionCurrentPage(): number {
    return this.recommdantionCurrentPage$.getValue();
  }

  private recommendations: BehaviorSubject<ProductionPreview[]> = new BehaviorSubject<ProductionPreview[]>([]);
  get recommendations$(): Observable<ProductionPreview[]> {
    return this.recommendations.asObservable();
  }
  

  /**
   * Description: Este método obtiene la lista de series populares de la API de TMDB.
   * @returns Observable<any>
   */
  public getShowsList(): void{
    this.http.get<ProductionResponse>(
      `https://api.themoviedb.org/3/discover/tv?page=${this.showsCurrentPage}&sort_by=popularity.desc`,
      {headers: this.headers}
    ).pipe(
      map((response: ProductionResponse) => {
        return response.results;
      })
    ).subscribe((response: ProductionPreview[]) => this.showList.next(response));
  }

  /**
   * Description: Este método obtiene el detalle de una serie específica de la API de TMDB.
   * @param id - ID de la serie
   * @returns Observable<any>
   */
  public getShowDetail(id: number): void {
    this.show.next(null);
    this.http.get<Production>(`https://api.themoviedb.org/3/tv/${id}`, {
      headers: this.headers
    }).pipe(
      map((response) => {
        return response;
      }
    )).subscribe({
      next: (response: Production) => {
        this.getShowVideos(id, response);
      },
      error: (error: any) => {
        console.error('Error al obtener el detalle de la serie:', error);
      }
    });
  }

  private getShowVideos(id: number, show: Production): void {
    this.http.get<VideosResponse>(`https://api.themoviedb.org/3/tv/${id}/videos`, {
      headers: this.headers
    }).pipe(
      map((response) => {
        return response;
      }
    )).subscribe({
      next: (response) => {
        show.videos = response.results.length > 0 ? response.results : null;
        this.show.next(show);
      },
      error: (error: any) => {
        this.show.next(show);
        console.error('Error al obtener el detalle de la serie:', error);
      }
    });
  }

  public getRecommendations(id: number): void {
     this.http.get<ProductionResponse>(`https://api.themoviedb.org/3/tv/${id}/recommendations?page=${this.showsCurrentPage}`, {
      headers: this.headers
    }).pipe(
      map((response) => {
        return response.results;
      }
    )).subscribe({
      next: (response: ProductionPreview[]) => {
        this.recommendations.next(response);
      }, 
      error: (error: any) => {
        console.error('Error al obtener las recomendaciones:', error);
      }
    });
  }

}
