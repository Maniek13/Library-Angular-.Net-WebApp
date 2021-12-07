import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {iBook} from '../../interfaces/iBook'
import { BooksService } from 'src/app/services/books/books.service';
import { OrderService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() userId : number = 0;
  books: iBook[] = [];

  currentBook = <iBook>{};

  @Output() messageEvent = new EventEmitter<iBook>();

  constructor(private booksService: BooksService, private orderService : OrderService) { }

  getBooks(): void {
    this.booksService.getBooks().subscribe(books => this.books = books);
  }

  ngOnInit() {
    this.getBooks();
  }

  addToOrder(book: iBook): void {
    this.orderService.addToOrder(this.userId, book).subscribe();
    setTimeout(()=>{
      this.books = this.books.filter(u => u !== book);
      this.currentBook = book;
    }, 100);
  }

  addBookRemovedFromUser(book: iBook) {
    this.getBooks();
  }

  
  addBook(book: iBook){
    this.books.push(book);
  }

  addItem(book: iBook) {
    let index = this.books.indexOf(book)
    this.books.splice(index, 1);
    this.addToOrder(book);
  }
  
}
