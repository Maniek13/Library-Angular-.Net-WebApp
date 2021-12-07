import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/iBook';
import { Observable, Subject } from 'rxjs';
import { BooksService } from 'src/app/services/books/books.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})
export class BooksSearchComponent implements OnInit {
  books$!: Observable<Book[]>;
  name = ""

  @Output() addBookEvt = new EventEmitter<Book>();

  private searchTerms = new Subject<string>();

  constructor(private booksService: BooksService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.booksService.searchBooks(term)),
    );
  }

  addToOrder(book: Book) {
    this.addBookEvt.emit(book);
    this.search("");
    this.name = '';
  }

}
