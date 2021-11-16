import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'https://localhost:7216/api/orders'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getOrder(userId: number): Observable<Book[]> {
    const url = `${this.orderUrl}/userId/${userId}`;
    return this.http.get<Book[]>(url)
    .pipe(
      tap(_ => this.log(`fetched order for id=${userId}`)),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  addToOrder(userId: number, book: Book): Observable<Book> {
    const url = `${this.orderUrl}/userId/${userId}`;
    return this.http.post<Book>(url, book, this.httpOptions).pipe(
      tap(_ => this.log(`added book to order for ${userId}`)),
      catchError(this.handleError<Book>('addToOrder'))
    );
  }

  deleteFromOrder(id: number): Observable<Book> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete book from order book id: ${id}`)),
      catchError(this.handleError<Book>('delBook'))
    );
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.status} ${error.message}`);
      return of(result as T);
    };
  }
}
