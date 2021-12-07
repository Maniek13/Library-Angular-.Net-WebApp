import { Injectable } from '@angular/core';
import { iUser } from '../../interfaces/iUser';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { iUserPassword } from 'src/app/interfaces/IUserPassword';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'https://localhost:7216/api/Users'

  constructor(private http: HttpClient) { }

  postUserLogin(userPassword: iUserPassword): Observable<number | iUser> {
    const url = `${this.usersUrl}/login/${"valid"}`;

      return this.http.post<number>(url, userPassword, this.httpOptions).pipe(
      catchError(this.handleError<iUser>('login'))
    );
  }

  getUser(id: number): Observable<iUser> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<iUser>(url).pipe(
      catchError(this.handleError<iUser>(`getUser id=${id}`))
    );
  }

  addUser(userPassword: iUserPassword): Observable<number | iUser> {
    const url = `${this.usersUrl}/login/${"create"}`;
    return this.http.post<iUser>(url, userPassword, this.httpOptions).pipe(
      catchError(this.handleError<iUser>('addUser'))
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(error.message as T);
    };
  }
}
