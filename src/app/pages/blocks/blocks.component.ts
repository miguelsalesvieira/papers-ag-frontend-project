import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {
  BlockResponse,
  BlocksService,
  BlockWithTransactionCount,
} from 'src/app/services/blocks.service';

export interface Block {
  level: number;
  proposer: string;
  timestamp: string;
  transactionsCount: number;
}

@Component({
  selector: 'app-page-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class BlocksPageComponent implements OnInit, OnDestroy {
  public numberOfBlocksPerPage: number = 20;
  public totalNumberOfBlocks: number = 0;
  public currentPage: number = 0;
  public pageStep: number = 5;
  public blocks: Block[] = [];

  constructor(private router: Router, private blocksService: BlocksService) {}

  get maxNumberPages() {
    return Math.floor(this.totalNumberOfBlocks / this.numberOfBlocksPerPage);
  }

  ngOnInit(): void {
    this.getNumberOfBlocks();
  }

  ngOnDestroy(): void {}

  // ASYNC REQUESTS
  getNumberOfBlocks() {
    const _this = this;
    this.blocksService.getNumberOfBlocks().subscribe({
      next(numberOfBlocks: number) {
        _this.totalNumberOfBlocks = numberOfBlocks;
      },
      complete() {
        _this.getBlocks();
      },
      error(error) {
        console.error(error);
      },
    });
  }

  getBlocks() {
    const _this = this;
    this.blocksService
      .getBlocks(this.numberOfBlocksPerPage, this.currentPage)
      .subscribe({
        next(blocks: BlockResponse[]) {
          _this.blocks = blocks.map((block: BlockResponse) => {
            return {
              level: block.level,
              proposer: block.proposer?.alias || block.proposer?.address,
              timestamp: `${new Date(
                block.timestamp
              ).toLocaleDateString()} - ${new Date(
                block.timestamp
              ).toLocaleTimeString()}`,
              transactionsCount: 0,
            };
          });
        },
        complete() {
          _this.getTransactionCounts();
        },
        error(error) {
          console.error(error);
        },
      });
  }

  getTransactionCounts() {
    const _this = this;
    const blocks: BlockWithTransactionCount[] = this.blocks.map(
      (block: Block, index: number) => {
        return { index: index, block: block };
      }
    );
    this.blocksService.getBlocksWithTransactionCount(blocks).subscribe({
      next(block: BlockWithTransactionCount) {
        _this.blocks[block.index] = block.block;
      },
      complete() {
        console.log('Finished getting all data');
      },
      error(error) {
        console.error(error);
      },
    });
  }

  // NAVIGATION HANDLERS
  onClickItem(index: number) {
    const level = this.blocks[index].level;
    this.router.navigate([`/blocks/${level}`]);
  }

  // PAGINATION HANDLERS
  onClickNext() {
    if (this.currentPage >= this.maxNumberPages) return;
    this.currentPage++;
    this.getBlocks();
  }

  onClickPrevious() {
    if (this.currentPage <= 0) return;
    this.currentPage--;
    this.getBlocks();
  }

  onClickNextN() {
    if (this.currentPage > this.maxNumberPages - this.pageStep)
      this.currentPage =
        this.currentPage + Math.abs(this.maxNumberPages - this.currentPage);
    else this.currentPage = this.currentPage + this.pageStep;
    this.getBlocks();
  }

  onClickPreviousN() {
    if (this.currentPage < this.pageStep) this.currentPage = 0;
    else this.currentPage = this.currentPage - this.pageStep;
    this.getBlocks();
  }

  onClickPageN(page: number) {
    this.currentPage = page;
    this.getBlocks();
  }

  onClickNumberPerPage(value: number) {
    this.numberOfBlocksPerPage = value;
    this.getBlocks();
  }
}
