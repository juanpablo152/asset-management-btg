import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundListComponent } from './fund-list.component';

describe('FundListComponent', () => {
  let component: FundListComponent;
  let fixture: ComponentFixture<FundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
