import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/interfaces/iBook';
import { OrderService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-books-order-list',
  templateUrl: './books-order-list.component.html',
  styleUrls: ['./books-order-list.component.css']
})
export class BooksOrderListComponent implements OnInit {
  books :Book[] = [];
  orderedBooks :Book[] = [];
  saveOrderIsVisible :boolean = false;

  @Input() userId : number = 0;
  @Input() book : Book = <Book>{};
  @Output() removeBookEvent = new EventEmitter<Book>();

  constructor(private orderService: OrderService) { }

  getBooks(): void {
    this.orderService.getOrder(this.userId).subscribe(books => this.books = books);
    this.orderService.getOrderedList(this.userId).subscribe(books => this.orderedBooks = books);

    setTimeout(()=>{   
      if(this.books.length > 0){
        this.saveOrderIsVisible = true;
      }
      else{
        this.saveOrderIsVisible = false;
      }
    }, 50);
  }
  
  async ngOnInit() {
    await this.getBooks();
  }

  async ngOnChanges() {
    await this.getBooks();
  }

  deleteFromOrder(book : Book){
    this.orderService.deleteFromOrder(book.bookID).subscribe();
    setTimeout(()=>{   
      this.books = this.books.filter(u => u !== book);
      this.removeBookEvent.emit(book);

      if(this.books.length <= 0){
        this.saveOrderIsVisible = false;
      }
    }, 200);
  }


  saveOrder(){
    this.orderService.saveOrder(this.userId).subscribe();
    setTimeout(()=>{   
      this.getBooks();
    }, 200);
  }
}
