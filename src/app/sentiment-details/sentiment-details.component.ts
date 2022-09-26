import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { insidersentiment } from '../shared/insidersentiment.model';
import { SentimentDetailsService } from './sentiment-details.service';

@Component({
  selector: 'app-sentiment-details',
  templateUrl: './sentiment-details.component.html',
  styleUrls: ['./sentiment-details.component.css']
})
export class SentimentDetailsComponent implements OnInit {
  
  symbol: string = '';
  SentimentSelected: insidersentiment[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private sentimentservice: SentimentDetailsService, private location: Location) { 
   }

  ngOnInit(): void {
    
    this.symbol = this.route.snapshot.params['symbol'];
    this.sentimentservice.getInsiderSentiment(this.symbol).subscribe( {
      next: sentiment => {
        this.SentimentSelected = [];
        this.SentimentSelected = sentiment;
      },
      error: err => this.errorMessage = err
    })
  }

  goBack():void {
    this.SentimentSelected = [];
    this.location.back()
  }

}
