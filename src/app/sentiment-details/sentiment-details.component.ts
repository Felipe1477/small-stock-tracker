import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { insidersentiment } from '../shared/insidersentiment.model';
import { SentimentDetailsService } from './sentiment-details.service';
import { Subscription } from 'rxjs';

export enum MonthList {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
};

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.css']
})
export class SentimentDetailsComponent implements OnInit {

  symbol: string = '';
  companyName: string = '';
  SentimentSelected: insidersentiment[] = [];
  errorMessage: string = '';
  monthList = MonthList;

  subscription1$?: Subscription;
  subscription2$?: Subscription;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private sentimentservice: SentimentDetailsService,
    private location: Location) {
  }

  ngOnInit(): void {

    this.symbol = this.route.snapshot.params['symbol'];
    this.subscription1$ = this.sentimentservice.getInsiderSentiment(this.symbol).subscribe({
      next: sentiment => {
        this.SentimentSelected = [];
        this.SentimentSelected = sentiment;
      },
      error: err => this.errorMessage = err
    })
    this.subscription2$ = this.sentimentservice.getCompanyName(this.symbol).subscribe({
      next: companyName => {
        this.companyName = companyName;
      },
      error: err => this.errorMessage = err
    })
    this.subscriptions.push(this.subscription1$);
    this.subscriptions.push(this.subscription2$);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  goBack(event: Event): void {
    console.log(event);
    this.SentimentSelected = [];
    this.location.back()
  }

}
