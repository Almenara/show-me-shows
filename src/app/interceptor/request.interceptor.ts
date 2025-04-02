import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Clase para interceptar las solicitudes HTTP y agregar el token CSRF (Cross-Site Request Forgery) en el encabezado de la solicitud.
 */

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private router: Router = inject(Router);

  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>>  {

    return handler.handle(req).pipe(
      //en caso de que se de caulquier error comprobamos de que se trata
      catchError((error) => {
        // Si la solicitud HTTP devuelve un error 0 y status ok false, es que se ha perdido la conexión con el servidor
        if ((error.status === 0 && !error.ok) || error.status === 502 || error.status === 504){
          // Reenviamos a pantalla de error
          this.router.navigate(['/error'])
          return throwError(() => error)
        }
        return throwError(() => error)
      })
    );

  }
}
