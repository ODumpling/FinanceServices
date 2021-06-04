import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  CreateFundCommand,
  CreateTransactionCommand, FundDto,
  FundsClient,
  PaginatedListOfFundDto,
  TransactionDto
} from '../web-api-client';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-list-fund',
  templateUrl: './list-fund.component.html',
  styleUrls: ['./list-fund.component.css']
})
export class ListFundComponent implements OnInit {
  public funds: PaginatedListOfFundDto;
  public pageNumber: number;
  public pageSize: number;
  public modalRef: BsModalRef;
  public newFundForm: any = {};
  constructor(private client: FundsClient, private modalService:BsModalService) {
    client.listFunds(this.pageNumber, this.pageSize).subscribe(res => {
      this.funds = res.funds;
    });
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addFund() {
    const fund = FundDto.fromJS({
      id         : 0,
      name     : this.newFundForm.name,
    });

    this.client.createFund(<CreateFundCommand>{
      name: this.newFundForm.name,
    }).subscribe(result => {
      fund.id = result;
      this.funds.items.push(fund);
    }, error => {
      const errors = JSON.parse(error.response);

      if (errors && errors.Title) {
        this.newFundForm.error = errors.Title[0];
      }
    });

    this.newFundForm = {};
    this.modalRef.hide();
  }

}
