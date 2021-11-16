import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOrderListComponent } from './books-order-list.component';

describe('BooksOrderListComponent', () => {
  let component: BooksOrderListComponent;
  let fixture: ComponentFixture<BooksOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
