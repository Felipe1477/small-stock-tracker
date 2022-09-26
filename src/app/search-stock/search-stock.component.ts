import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private searchstockservice: SearchStockService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchstockservice.getCompany().subscribe({
      next: company => {
        this.companies = company;
        this.searchstockservice.getCompanyData(this.companies).subscribe({
          next: company => {
            this.companies = company;
            console.log(this.companies);
          },
          error: err => this.errorMessage = err
        })
      },
      error: err => this.errorMessage = err
    })

  }


  displayStock(stockFiltered: string) {
    this.addstocks = true;
    this.companies?.map(company => {
      if (company.symbol == stockFiltered) {
        this.stocks.forEach((element, index) => {
          if (element.symbol == stockFiltered && this.stocks) this.addstocks = false;
        });
        if (this.addstocks){
        this.stocks.push(company);
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
    }
  }

}
