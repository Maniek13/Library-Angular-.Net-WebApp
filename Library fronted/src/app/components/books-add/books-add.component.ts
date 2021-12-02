import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
  model: Book = <Book>{};

  @Output() bookEvent = new EventEmitter<Book>();

  constructor(private booksService: BooksService) { }
  
  ngOnInit(): void {
  }

  add(): void {
    this.model.status = "new";

    this.booksService.addBook(this.model as Book)
      .subscribe(resp => {
        if(typeof(resp) === 'object'){
          this.bookEvent.emit(resp);
        }
        else{
          alert(resp);
        }
      });
  }
}
