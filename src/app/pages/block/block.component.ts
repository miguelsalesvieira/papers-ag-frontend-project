import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TransactionResponse,
  TransactionsService,
} from 'src/app/services/transactions.service';

export interface Transaction {
  sender: string;
  target: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-page-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockPageComponent implements OnInit {
  public numberOfTransactionsPerPage: number = 20;
  public totalNumberOfTransactions: number = 0;
  public currentPage: number = 0;
  public pageStep: number = 5;
  public currentBlockLevel: number = 0;
  public transactions: Transaction[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService
  ) {}

  get maxNumberPages() {
    return Math.floor(
      this.totalNumberOfTransactions / this.numberOfTransactionsPerPage
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const level = params['level'];
      this.currentBlockLevel = level;
      this.getNumberOfTransactions();
    });
  }

  // ASYNC REQUESTS
  getNumberOfTransactions() {
    const _this = this;
    this.transactionsService
      .getNumberOfTransactions(this.currentBlockLevel)
      .subscribe({
        next(numberOfTransactions: number) {
          _this.totalNumberOfTransactions = numberOfTransactions;
        },
        complete() {
          _this.getTransactions();
        },
        error(error) {
          console.error(error);
        },
      });
  }

  getTransactions() {
    const _this = this;
    this.transactionsService
      .getTransactions(
        this.currentBlockLevel,
        this.numberOfTransactionsPerPage,
        this.currentPage
      )
      .subscribe({
        next(transactions: TransactionResponse[]) {
          _this.transactions = transactions.map(
            (transaction: TransactionResponse) => {
              return {
                sender:
                  transaction.sender?.alias || transaction.sender?.address,
                target:
                  transaction.target?.alias || transaction.target?.address,
                amount: transaction.amount,
                status: transaction.status,
              };
            }
          );
        },
        complete() {
          console.log('fetch all transactions', _this.transactions);
        },
        error(error) {
          console.error(error);
        },
      });
  }

  // NAVIGATION HANDLERS
  onClickBack() {
    this.router.navigate([`/blocks`]);
  }
  onClickItem(index: number) {
    console.log('clicked item');
  }

  // PAGINATION HANDLERS
  onClickNext() {
    if (this.currentPage >= this.maxNumberPages) return;
    this.currentPage++;
    this.getTransactions();
  }

  onClickPrevious() {
    if (this.currentPage <= 0) return;
    this.currentPage--;
    this.getTransactions();
  }

  onClickNextN() {
    if (this.currentPage > this.maxNumberPages - this.pageStep)
      this.currentPage =
        this.currentPage + Math.abs(this.maxNumberPages - this.currentPage);
    else this.currentPage = this.currentPage + this.pageStep;
    this.getTransactions();
  }

  onClickPreviousN() {
    if (this.currentPage < this.pageStep) this.currentPage = 0;
    else this.currentPage = this.currentPage - this.pageStep;
    this.getTransactions();
  }

  onClickPageN(page: number) {
    this.currentPage = page;
    this.getTransactions();
  }

  onClickNumberPerPage(value: number) {
    this.numberOfTransactionsPerPage = value;
    this.getTransactions();
  }
}
