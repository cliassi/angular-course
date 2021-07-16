import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.scss'],
})
export class ParentComponentComponent implements OnInit {
  forChildOne = 0;

  constructor(public ts: TransferService) {}

  ngOnInit(): void {}

  subtract(ev: any) {
    this.forChildOne = ev;
  }

  inc(){
    this.ts.inc();
  }
}
