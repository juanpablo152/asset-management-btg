import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundCardComponent } from './fund-card.component';

describe('FundCardComponent', () => {
  let component: FundCardComponent;
  let fixture: ComponentFixture<FundCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
