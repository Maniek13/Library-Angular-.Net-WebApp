import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component'
import { BooksOrderListComponent } from './components/books-order-list/books-order-list.component';
import { BooksAddComponent } from './components/books-add/books-add.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BooksSearchComponent } from './components/books-search/books-search.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BooksOrderListComponent,
    BooksAddComponent,
    LoginComponent,
    MainComponent,
    BooksSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
