import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentDetailsComponent } from './sentiment-details.component';

describe('SentimentDetailsComponent', () => {
  let component: SentimentDetailsComponent;
  let fixture: ComponentFixture<SentimentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
