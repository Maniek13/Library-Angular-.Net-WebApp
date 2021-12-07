import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/iBook';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'https://localhost:7216/api/orders'

  constructor(private http: HttpClient) { }

  getOrder(userId: number): Observable<Book[]> {
    const url = `${this.orderUrl}/userId/${userId}&${"peeding"}`;
    return this.http.get<Book[]>(url)
    .pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  
  getOrderedList(userId: number): Observable<Book[]> {
    const url = `${this.orderUrl}/userId/${userId}&${"ordered"}`;
    return this.http.get<Book[]>(url)
    .pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  addToOrder(userId: number, book: Book): Observable<Book> {
    const url = `${this.orderUrl}/userId/${userId}`;
    return this.http.post<Book>(url, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addToOrder'))
    );
  }

  deleteFromOrder(id: number): Observable<Book> {
    const url = `${this.orderUrl}/delete/${id}`;
    return this.http.put<Book>(url, this.httpOptions).pipe(
      catchError(this.handleError<Book>('delBook'))
    );
  }

  saveOrder(userId: number): Observable<Book> {
    const url = `${this.orderUrl}/set/${userId}&${"order"}`;
    return this.http.put<Book>(url, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addToOrder'))
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
