import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'https://localhost:7216/api/Users'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap((user) => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  postUserLogin(login: string, password: string): Observable<any> {
    const url = `${this.usersUrl}/login`;
    var body = {
      login: login,
      password: password
    }
    console.log(url);
      return this.http.post<number>(url, body, this.httpOptions).pipe(
      tap(_ => this.log(`login user w/ ${login}`)),
      catchError(this.handleError<User>('login'))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.userID}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated users id=${user.userID}`)),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.userID}, name=${newUser.name}, surname=${newUser.surname}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
  
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.usersUrl}/name/${term}`;
    return this.http.get<User[]>(url).pipe(
      tap(x => x.length ? 
        this.log(`found user matching "${term}"`) :
        this.log(`no user matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(error.message as T);
    };
  }
}
