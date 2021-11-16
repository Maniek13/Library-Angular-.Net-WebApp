import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = 'https://localhost:7216/api/books'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
    .pipe(
      tap((book) => this.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(result as T);
    };
  }
}
