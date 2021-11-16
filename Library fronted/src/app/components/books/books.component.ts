import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Book} from '../../interfaces/book'
import { BooksService } from 'src/app/services/books/books.service';
import { OrderService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  currentBook = <Book>{};

  @Output() messageEvent = new EventEmitter<Book>();

  constructor(private booksService: BooksService, private orderService : OrderService) { }

  getBooks(): void {
    this.booksService.getBooks().subscribe(books => this.books = books);
  }

  ngOnInit() {
    this.getBooks();
  }

  addToOrder(book: Book): void {
    this.orderService.addToOrder(1, book).subscribe();
    setTimeout(()=>{
      this.books = this.books.filter(u => u !== book);
      this.currentBook = book;
    }, 100);

  }

  addBookRemovedFromUser(book: Book) {
    this.getBooks();
  }
  
}
