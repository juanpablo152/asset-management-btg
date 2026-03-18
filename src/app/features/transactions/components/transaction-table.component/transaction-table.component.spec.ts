import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTableComponent } from './transaction-table.component';

describe('TransactionTableComponent', () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
