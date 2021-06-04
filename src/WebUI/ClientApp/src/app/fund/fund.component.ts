import {Component, OnInit, TemplateRef} from '@angular/core';
import {CreateFundCommand, CreateTransactionCommand, FundDto, FundDto2, FundsClient, TransactionDto, TransactionsClient, TransactionType, TypeDto} from '../web-api-client';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector   : 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls  : ['./fund.component.css']
})
export class FundComponent implements OnInit {
  public debug = false;
  public fund: FundDto2;
  public transactions: TransactionDto[];
  public transactionType: TypeDto[];
  public modalRef: BsModalRef;
  public newTransactionForm: any = {};

  constructor(private route: ActivatedRoute,
              private client: FundsClient,
              private tclient: TransactionsClient,
              private modalService: BsModalService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe(res => {
      client.getFund(res).subscribe(result => {
        this.fund = result.fund;
        this.transactions = result.fund.transactions;
        this.transactionType = result.transactionTypes;
      });
    });
  }

  ngOnInit(): void {
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addTransaction() {

    const transaction = TransactionDto.fromJS({
      id         : 0,
      type       : this.newTransactionForm.type,
      description: this.newTransactionForm.description,
      amount     : this.newTransactionForm.amount,
    });

    this.tclient.createTransaction(<CreateTransactionCommand>{
      fundId: this.fund.id,
      type: this.newTransactionForm.type,
      amount: this.newTransactionForm.amount,
      description: this.newTransactionForm.description }).subscribe(result => {
        transaction.id = result;
        this.transactions.push(transaction);
    }, error => {
      const errors = JSON.parse(error.response);

      if (errors && errors.Title) {
        this.newTransactionForm.error = errors.Title[0];
      }
    });

    this.newTransactionForm = {};
    this.modalRef.hide();
  }
}
