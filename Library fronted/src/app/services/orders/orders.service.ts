import { Injectable } from '@angular/core';
import { iBook } from '../../interfaces/iBook';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'https://localhost:7216/api/orders'

  constructor(private http: HttpClient) { }

  getOrder(userId: number): Observable<iBook[]> {
    const url = `${this.orderUrl}/userId/${userId}&${"peeding"}`;
    return this.http.get<iBook[]>(url)
    .pipe(
      catchError(this.handleError<iBook[]>('getBooks', []))
    );
  }
  
  getOrderedList(userId: number): Observable<iBook[]> {
    const url = `${this.orderUrl}/userId/${userId}&${"ordered"}`;
    return this.http.get<iBook[]>(url)
    .pipe(
      catchError(this.handleError<iBook[]>('getBooks', []))
    );
  }

  addToOrder(userId: number, book: iBook): Observable<iBook> {
    const url = `${this.orderUrl}/userId/${userId}`;
    return this.http.post<iBook>(url, book, this.httpOptions).pipe(
      catchError(this.handleError<iBook>('addToOrder'))
    );
  }

  deleteFromOrder(id: number): Observable<iBook> {
    const url = `${this.orderUrl}/delete/${id}`;
    return this.http.put<iBook>(url, this.httpOptions).pipe(
      catchError(this.handleError<iBook>('delBook'))
    );
  }

  saveOrder(userId: number): Observable<iBook> {
    const url = `${this.orderUrl}/set/${userId}&${"order"}`;
    return this.http.put<iBook>(url, this.httpOptions).pipe(
      catchError(this.handleError<iBook>('addToOrder'))
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
