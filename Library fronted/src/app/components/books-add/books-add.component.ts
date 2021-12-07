import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { iBook } from 'src/app/interfaces/iBook';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {
  model: iBook = <iBook>{};

  @Output() bookEvent = new EventEmitter<iBook>();

  constructor(private booksService: BooksService) { }
  
  ngOnInit(): void {
  }

  add(): void {
    this.model.status = "free";

    this.booksService.addBook(this.model as iBook)
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
