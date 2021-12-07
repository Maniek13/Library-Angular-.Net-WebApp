import { Injectable } from '@angular/core';
import { User } from '../../interfaces/iUser';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { UserPassword } from 'src/app/interfaces/IUserPassword';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'https://localhost:7216/api/Users'

  constructor(private http: HttpClient) { }

  postUserLogin(userPassword: UserPassword): Observable<any> {
    const url = `${this.usersUrl}/login/${"valid"}`;

      return this.http.post<number>(url, userPassword, this.httpOptions).pipe(
      catchError(this.handleError<User>('login'))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(userPassword: UserPassword): Observable<User> {
    const url = `${this.usersUrl}/login/${"create"}`;
    
    return this.http.post<User>(url, userPassword, this.httpOptions).pipe(
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
