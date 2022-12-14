import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { company } from '../shared/company.model';
import { insidersentiment } from '../shared/insidersentiment.model';

export interface symbolsentiment {
  data: insidersentiment[],
  symbol: string
}

@Injectable({
  providedIn: 'root'
})
export class SentimentDetailsService {

  symbolSentimentSelected?: symbolsentiment;
  SentimentSelected: insidersentiment[] = [];
  companyName: string = '';

  private insidersentiment = 'api/insidersentiment-details.json';
  private companyUrl = 'api/company-details.json';

  constructor(private http: HttpClient) { }

  getInsiderSentiment(symbol: string): Observable<insidersentiment[]> {
    this.SentimentSelected = [];
    return this.http.get<symbolsentiment[]>(this.insidersentiment).pipe(
      map(sentimentData => {
        for (let i = 0; i < sentimentData.length; i++) {
          if (sentimentData[i].symbol == symbol) {
            this.symbolSentimentSelected = sentimentData[i];
          }
        }
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        if (this.symbolSentimentSelected) {
          for (let j = 0; j < this.symbolSentimentSelected.data.length; j++) {
            if (this.symbolSentimentSelected.data[j].year == currentYear) {
              if (this.symbolSentimentSelected.data[j].month == currentMonth - 1
                || this.symbolSentimentSelected.data[j].month == currentMonth - 2
                || this.symbolSentimentSelected.data[j].month == currentMonth - 3)
                this.SentimentSelected.push(this.symbolSentimentSelected.data[j])
            }
          }
        }
        return this.SentimentSelected;
      }),
      catchError(() => of([]))
    );
  }

  getCompanyName(symbol: string): Observable<string> {
    return this.http.get<company[]>(this.companyUrl).pipe(
      map(companyData => {
        for (let i = 0; i < companyData.length; i++) {
            if (companyData[i].symbol == symbol) {
              this.companyName = companyData[i].description;
            }
        }
        return this.companyName;
      }
      ),
      catchError(() => of(''))
    );
  }



}
