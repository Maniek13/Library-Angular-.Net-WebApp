import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/iBook';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = 'https://localhost:7216/api/books'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
    .pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  addBook(book: Book): Observable<any> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.booksUrl}/search/${term}`;
    return this.http.get<Book[]>(url).pipe(
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(error.message as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
