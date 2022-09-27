import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { company } from '../shared/company.model';
import { SearchStockService } from './search-stock.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {

  stocks: company[] = [];
  companies?: company[];
  errorMessage: string = '';
  addstocks = true;
  addStocksInit = false;

  subscription1$?: Subscription;
  subscription2$?: Subscription;
  subscriptions: Subscription[] = [];


  constructor(private searchstockservice: SearchStockService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription1$ = this.searchstockservice.getCompany().subscribe({
      next: company => {
        this.companies = company;
        this.subscription2$ = this.searchstockservice.getCompanyData(this.companies).subscribe({
          next: company => {
            this.companies = company;
            console.log(this.companies);
            for (let i = 0; i < this.searchstockservice.companySelected.length; i++) {
              this.displayStock(this.searchstockservice.companySelected[i])
            }
            this.addStocksInit = true;
          },
          error: err => this.errorMessage = err
        })
      },
      error: err => this.errorMessage = err
    })
    if (this.subscription1$ && this.subscription2$) {
      this.subscriptions.push(this.subscription1$)
      this.subscriptions.push(this.subscription2$)
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


  displayStock(stockFiltered: string) {
    this.addstocks = true;
    this.companies?.map(company => {
      if (company.symbol == stockFiltered) {
        this.stocks.forEach((element, index) => {
          if (element.symbol == stockFiltered && this.stocks) this.addstocks = false;
        });
        if (this.addstocks) {
          this.stocks.push(company);
          if (this.addStocksInit) {
            this.searchstockservice.companySelected.push(stockFiltered);
          }
        }
      }
    })
  }

  goSentimentDetails(symbolselect: string) {
    //this.router.navigate(['/sentiment', {symbol: symbolselect}])
    this.router.navigate([`sentiment/${symbolselect}`]);
  }

  onCloseClick(symbolremove: string) {
    if (this.stocks) {
      this.stocks.forEach((element, index) => {
        if (element.symbol == symbolremove && this.stocks) this.stocks.splice(index, 1);
      });
      this.searchstockservice.companySelected.forEach((element, index) => {
        if (element == symbolremove) this.searchstockservice.companySelected.splice(index, 1);
      });
    }
  }

}
