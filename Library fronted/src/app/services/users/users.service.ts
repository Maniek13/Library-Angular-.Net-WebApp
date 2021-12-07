import { Injectable } from '@angular/core';
import { User } from '../../interfaces/iUser';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'https://localhost:7216/api/Users'

  constructor(private http: HttpClient) { }

  postUserLogin(login: string, password: string): Observable<any> {
    const url = `${this.usersUrl}/login`;
    var body = {
      login: login,
      password: password
    }
      return this.http.post<number>(url, body, this.httpOptions).pipe(
      catchError(this.handleError<User>('login'))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
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
