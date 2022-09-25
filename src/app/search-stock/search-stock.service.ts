import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap, catchError, throwError, of, map } from 'rxjs';
import { company } from '../shared/company.model';
import { quote } from '../shared/quote.model';

@Injectable({
  providedIn: 'root'
})
export class SearchStockService {

  companyData: company[] = [];
  company?: company;
  quote?: quote;
  private companyUrl = 'api/company-details.json';
  private companyDataUrl = 'api/quote-details.json';

  constructor(private http: HttpClient) { }

  getCompany(): Observable<company[]> {
    return this.http.get<company[]>(this.companyUrl).pipe(
      tap(companyData => { console.log('Company Charge')
      }
      ),
      catchError(() => of([]))
    );
  }

  getCompanyData(companies: company[]): Observable<company[]> {
    return this.http.get<quote[]>(this.companyDataUrl).pipe(
      map(quoteData => {
        for (let i = 0; i < quoteData.length; i++) {
          for (let j = 0; j < companies.length; j++)
          if (companies[j].symbol == quoteData[i].symbol) {
            companies[j].data = quoteData[i];
          }
        }
        return companies;
      }),
      catchError(() => of([]))
    );
  }

}
