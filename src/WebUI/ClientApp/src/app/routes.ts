import {HomeComponent} from './home/home.component';
import {CounterComponent} from './counter/counter.component';
import {FetchDataComponent} from './fetch-data/fetch-data.component';
import {TodoComponent} from './todo/todo.component';
import {AuthorizeGuard} from '../api-authorization/authorize.guard';
import {Routes} from '@angular/router';
import {FundComponent} from './fund/fund.component';
import {ListFundComponent} from './list-fund/list-fund.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'counter', component: CounterComponent},
  {path: 'fetch-data', component: FetchDataComponent},
  {path: 'todo', component: TodoComponent, canActivate: [AuthorizeGuard]},
  {path: 'funds', component: ListFundComponent, canActivate: [AuthorizeGuard]},
  {path: 'funds/:id', component: FundComponent, canActivate: [AuthorizeGuard]},
];
