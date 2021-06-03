import { Component, OnInit } from '@angular/core';
import {FundDto, FundsClient, FundsVm, IFundsVm, PaginatedListOfFundDto} from '../web-api-client';

@Component({
  selector: 'app-list-fund',
  templateUrl: './list-fund.component.html',
  styleUrls: ['./list-fund.component.css']
})
export class ListFundComponent implements OnInit {
  public funds: PaginatedListOfFundDto;
  public pageNumber: number;
  public pageSize: number;
  constructor(private client: FundsClient) {
    client.listFunds(this.pageNumber, this.pageSize).subscribe(res => {
      this.funds = res.funds;
    });
  }

  ngOnInit(): void {
  }

}
