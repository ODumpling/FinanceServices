import { Component, OnInit } from '@angular/core';
import {FundDto, FundDto2, FundsClient, TransactionDto, TransactionType} from '../web-api-client';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  public fund: FundDto2;
  public transactions: TransactionDto[];
  public TransactionType = TransactionType;
  constructor(private route: ActivatedRoute, private client: FundsClient) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe(res => {
      client.getFund(res).subscribe(result => {
        this.fund = result.fund;
        this.transactions = result.fund.transactions;
      });
    });
  }

  ngOnInit(): void {
  }

}
