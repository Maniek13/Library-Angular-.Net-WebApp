import { Injectable } from '@angular/core';
import { iBook } from '../../interfaces/iBook';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { settings } from 'src/app/statics/settings';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = settings.baseUrl + '/api/books'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<iBook[]> {
    return this.http.get<iBook[]>(this.booksUrl)
    .pipe(
      catchError(this.handleError<iBook[]>('getBooks', []))
    );
  }

  addBook(book: iBook): Observable<iBook> {
    return this.http.post<iBook>(this.booksUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<iBook>('addBook'))
    );
  }

  searchBooks(term: string): Observable<iBook[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.booksUrl}/search/${term}`;
    return this.http.get<iBook[]>(url).pipe(
      catchError(this.handleError<iBook[]>('searchBooks', []))
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
