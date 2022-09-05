import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Block } from '../pages/blocks/blocks.component';
import { environment } from 'src/environments/environment';

export interface BlockResponse {
  level: number;
  proposer: { alias: string; address: string };
  timestamp: string;
}

export interface BlockWithTransactionCount {
  index: number;
  block: Block;
}

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  constructor(private http: HttpClient) {}

  public getNumberOfBlocks(): Observable<number> {
    const url = `${environment.url}/blocks/count`;
    return this.http.get<number>(url);
  }

  public getBlocks(
    numberOfBlocks: number,
    page: number
  ): Observable<BlockResponse[]> {
    const url = `${environment.url}/blocks?limit=${numberOfBlocks}&sort.desc=level&offset.pg=${page}`;
    return this.http.get<BlockResponse[]>(url);
  }

  public getBlocksWithTransactionCount(
    blocks: BlockWithTransactionCount[]
  ): Observable<BlockWithTransactionCount> {
    const observable = new Observable<BlockWithTransactionCount>(
      (observer: Observer<BlockWithTransactionCount>) => {
        let count = 0;
        for (let i = 0; i < blocks.length; i++) {
          const url = `${environment.url}/operations/transactions/count?level=${blocks[i].block.level}`;
          this.http.get<number>(url).subscribe((transactionCount: number) => {
            observer.next({
              index: blocks[i].index,
              block: {
                ...blocks[i].block,
                transactionsCount: transactionCount,
              },
            });
            count++;
            if (count >= blocks.length) observer.complete();
          });
        }
        return { unsubscribe() {} };
      }
    );
    return observable;
  }
}
