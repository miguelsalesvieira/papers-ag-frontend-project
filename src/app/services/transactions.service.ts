import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Block } from '../pages/blocks/blocks.component';

export interface TransactionResponse {
  sender: { alias: string; address: string };
  target: { alias: string; address: string };
  amount: number;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  public getNumberOfTransactions(blockLevel: number): Observable<number> {
    const url = `https://api.tzkt.io/v1/operations/transactions/count?level=${blockLevel}`;
    return this.http.get<number>(url);
  }

  public getTransactions(
    blockLevel: number,
    numberOfTransactions: number,
    page: number
  ): Observable<TransactionResponse[]> {
    const url = `https://api.tzkt.io/v1/operations/transactions?level=${blockLevel}&limit=${numberOfTransactions}&offset.pg=${page}`;
    return this.http.get<TransactionResponse[]>(url);
  }
}
