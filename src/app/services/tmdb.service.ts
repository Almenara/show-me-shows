import { BehaviorSubject, map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductionResponse } from '../models/production-response';
import { Production } from '../models/production';

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

  private showList: BehaviorSubject<Production[]> = new BehaviorSubject<Production[]>([]);
  get showList$(): Observable<Production[]> {
    return this.showList.asObservable();
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
    ).subscribe((response: Production[]) => this.showList.next(response));
  }

  /**
   * Description: Este método obtiene el detalle de una serie específica de la API de TMDB.
   * @param id - ID de la serie
   * @returns Observable<any>
   */
  public getShowDetail(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, {
      headers: this.headers
    }).pipe(
      map((response) => {
        return response;
      }
    ));
  }

}
