import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export interface GraphUser {
  id: string;
  displayName: string;
  mail: string;
  givenName?: string;
  surname?: string;
  jobTitle?: string;
  officeLocation?: string;
  preferredLanguage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {
  private readonly graphApiUrl = 'https://graph.microsoft.com/v1.0';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información del usuario actual desde Microsoft Graph
   */
  getCurrentUser(accessToken: string): Observable<GraphUser> {
    const headers = this.createHeaders(accessToken);
    
    return this.http.get<GraphUser>(`${this.graphApiUrl}/me`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene la foto de perfil del usuario actual como Blob
   */
  getCurrentUserPhoto(accessToken: string): Observable<string | null> {
    const headers = this.createHeaders(accessToken);
    
    return this.http.get(`${this.graphApiUrl}/me/photo/$value`, { 
      headers, 
      responseType: 'blob' 
    }).pipe(
      switchMap((blob: Blob) => from(this.blobToBase64(blob))),
      catchError((error: HttpErrorResponse) => {
        // Si no hay foto de perfil disponible (404), retornamos null
        if (error.status === 404) {
          console.info('No profile photo available for user');
          return of(null);
        }
        return this.handleError(error);
      })
    );
  }

  /**
   * Obtiene las dimensiones disponibles de la foto de perfil
   */
  getAvailablePhotoSizes(accessToken: string): Observable<any> {
    const headers = this.createHeaders(accessToken);
    
    return this.http.get(`${this.graphApiUrl}/me/photos`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene una foto de perfil en un tamaño específico
   */
  getUserPhotoBySize(accessToken: string, size: string): Observable<string | null> {
    const headers = this.createHeaders(accessToken);
    
    return this.http.get(`${this.graphApiUrl}/me/photos/${size}/$value`, { 
      headers, 
      responseType: 'blob' 
    }).pipe(
      switchMap((blob: Blob) => from(this.blobToBase64(blob))),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.info(`No profile photo available for size ${size}`);
          return of(null);
        }
        return this.handleError(error);
      })
    );
  }

  /**
   * Crea los headers necesarios para las peticiones a Graph API
   */
  private createHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Convierte un Blob a string base64
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remover el prefijo data:image/jpeg;base64, o similar
        const base64 = result.split(',')[1] || result;
        resolve(`data:${blob.type};base64,${base64}`);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Maneja errores de las peticiones HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Server error: ${error.status} - ${error.message}`;
      
      // Agregar información específica de Graph API si está disponible
      if (error.error?.error) {
        errorMessage += ` - ${error.error.error.message}`;
      }
    }
    
    console.error('GraphApiService error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}