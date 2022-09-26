import { TestBed } from '@angular/core/testing';

import { SentimentDetailsService } from './sentiment-details.service';

describe('SentimentDetailsService', () => {
  let service: SentimentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
