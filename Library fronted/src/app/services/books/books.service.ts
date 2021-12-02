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

  addBook(book: Book): Observable<any> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => this.log(`added book w/ ${book.title}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }
  
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(error.message as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
