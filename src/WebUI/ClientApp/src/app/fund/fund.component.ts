import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  CreateTransactionCommand,
  FundDto2,
  FundsClient,
  PaginatedListOfTransactionDto,
  TransactionDto,
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
  transactionType: TypeDto[];
  modalRef: BsModalRef;
  newTransactionForm: any = {};
  id: string;
  page: number;
  pageSize = 10;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private client: FundsClient,
              private transactionsClient: TransactionsClient,
              private modalService: BsModalService) {

    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.loadFunds();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    })
  }

  loadFunds() {
    this.client.getFund(this.id, this.page, this.pageSize).subscribe((data) => {
      this.fund = data.fund;
      this.transactions = data.transactions;
      this.transactionType = data.transactionTypes;
    });
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
    this.transactionsClient.createTransaction(<CreateTransactionCommand>{
      fundId: this.fund.id,
      type: this.newTransactionForm.type,
      amount: this.newTransactionForm.amount,
      description: this.newTransactionForm.description
    }).subscribe(() => {
      this.loadFunds()
    }, error => {
      const errors = JSON.parse(error.response);
      if (errors && errors.Title) {
        this.newTransactionForm.error = errors.Title[0];
      }
    });

    this.newTransactionForm = {};
    this.modalRef.hide();
  }

  pageChanged(event: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page
      },
      // preserve the existing query params in the route
      queryParamsHandling: 'merge',
    }).then(() => this.loadFunds());
  }

}
