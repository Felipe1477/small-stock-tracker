import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { SentimentDetailsComponent } from './sentiment-details/sentiment-details.component';

const routes: Routes = [
  { path: 'sentiment/:symbol', component: SentimentDetailsComponent },
  { path: 'search', component: SearchStockComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
