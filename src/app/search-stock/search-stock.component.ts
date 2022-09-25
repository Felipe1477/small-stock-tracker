import { Component, OnInit } from '@angular/core';
import { company } from '../shared/company.model';
import { SearchStockService } from './search-stock.service';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit {

  stocks : company[] = [];
  companies? : company[];
  errorMessage: string = '';


  constructor(private searchstockservice: SearchStockService) { }

  ngOnInit(): void {
    this.searchstockservice.getCompany().subscribe( {
      next: company => {
        this.companies = company;
        this.searchstockservice.getCompanyData(this.companies).subscribe( {
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
    this.companies?.map(company => {
      if (company.symbol == stockFiltered) {
        this.stocks.push(company);
      } 
    })
      
  }

}
