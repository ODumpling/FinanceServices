import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  CreateTransactionCommand, CreateTransactionSubscription,
  FundDto2,
  FundsClient,
  PaginatedListOfTransactionDto, PaginatedListOfTransactionDto2,
  TransactionsClient,
  TypeDto
} from '../web-api-client';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css']
})
export class FundComponent implements OnInit {
  debug = false;
  fund: FundDto2;
  transactions: PaginatedListOfTransactionDto;
  recurringTransactions: PaginatedListOfTransactionDto2;
  transactionType: TypeDto[];
  modalRef: BsModalRef;
  newTransactionForm: any = {};
  id: string;
  page: number;
  pageSize = 10;
  subscription = [
    {value: "Weekly"},
    {value: "Monthly"}
  ]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private client: FundsClient,
              private transactionsClient: TransactionsClient,
              private modalService: BsModalService) {

    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.loadFund();
    this.loadRecurring();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    })
  }

  loadFund() {
    this.client.getFund(this.id, this.page, this.pageSize).subscribe((data) => {
      this.fund = data.fund;
      this.transactions = data.transactions;
      this.transactionType = data.transactionTypes;
    });
  }

  loadRecurring() {
    this.transactionsClient.listRecurringTransactions(this.id, this.page, this.pageSize).subscribe((data) => {
      this.recurringTransactions = data.transactions
    })
  }


  loadId(item) {
    if (this.page > 1) {
      return this.transactions.items.indexOf(item) + 1 + (this.page * 10)
    }
    return this.transactions.items.indexOf(item) + 1
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addTransaction() {

    console.log(this.newTransactionForm)

    this.newTransactionForm.date.setHours(12);

    this.transactionsClient.createTransaction(<CreateTransactionCommand>{
      fundId: this.fund.id,
      type: this.newTransactionForm.type,
      amount: this.newTransactionForm.amount,
      description: this.newTransactionForm.description,
      date: this.newTransactionForm.date,
    }).subscribe((result) => {
      console.log(this.newTransactionForm.sub);
      this.addTransactionSubscription(result, this.newTransactionForm.sub);
      this.loadFund();
      this.newTransactionForm = {};
    }, error => {
      const errors = JSON.parse(error.response);
      if (errors && errors.Title) {
        this.newTransactionForm.error = errors.Title[0];
      }
    });


    this.modalRef.hide();
  }

  addTransactionSubscription(id: string, type: string) {
    console.log({id, type})
    this.transactionsClient.createTransactionSubscription(<CreateTransactionSubscription>{
      id,
      type,
    }).subscribe(result => {
      console.log(result)
    })
  }

  pageChanged(event: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page
      },
      // preserve the existing query params in the route
      queryParamsHandling: 'merge',
    }).then(() => {
      this.loadFund();
      this.loadRecurring();
    });
  }

}
