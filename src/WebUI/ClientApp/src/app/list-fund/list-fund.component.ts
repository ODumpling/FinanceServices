import {Component, OnInit, TemplateRef} from '@angular/core';
import {CreateFundCommand, FundDto, FundsClient, PaginatedListOfFundDto} from '../web-api-client';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-fund',
  templateUrl: './list-fund.component.html',
  styleUrls: ['./list-fund.component.css']
})
export class ListFundComponent implements OnInit {
  funds: PaginatedListOfFundDto;
  pageNumber: number;
  pageSize = 9;
  modalRef: BsModalRef;
  newFundForm: any = {};
  debug = true;

  constructor(private client: FundsClient, private modalService: BsModalService, private route: ActivatedRoute, private router: Router) {
    this.loadFunds();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageNumber = params['page'];
    });
  }

  loadFunds() {
    this.client.listFunds(this.pageNumber, this.pageSize).subscribe(res => {
      this.funds = res.funds;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addFund() {
    const fund = FundDto.fromJS({
      id: 0,
      name: this.newFundForm.name,
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

  pageChanged(event: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: true
      // do not trigger navigation
    }).then(() => {
      this.loadFunds()
    });
  }
}
