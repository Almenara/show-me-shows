import { map, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private http: HttpClient = inject(HttpClient);
  private apiKey: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWE2Zjk2OGRhZTk5NGE1YjY3YWI5MWYxNDVkNWIzNCIsIm5iZiI6MTc0MzYxOTkzNC41Mzc5OTk5LCJzdWIiOiI2N2VkODc1ZTgzNmM4ZWRhN2NhYjA1ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zyoi-jnYB8DgZOenh1w7Tjzr0DtXEZXLiJCxDykvhOs';
  
  /**
   * Description: Este método obtiene la lista de películas populares de la API de TMDB.
   * @returns Observable<any>
   */
  public getMolvieList(): Observable<any>{
 
    return this.http.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      }
  }).pipe(
      map((response) => {
        return response;
      })
    );
  }
/*
  * Función para obtener las zonas/areas de estudio
  
public getStudyAreas(): Observable<{status:string, data:StudyArea[]}> {
  return this.http.get<{status:string, data:StudyArea[]}>(`${environment.BACKEND_BASE_URL}/api/dash/projects`, {
     headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json',
     },
     withCredentials: true
   }).pipe(
     map((response) => {
       return response;
     })
   );
 }*/

}
