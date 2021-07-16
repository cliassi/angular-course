import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-child-two',
  templateUrl: './child-two.component.html',
  styleUrls: ['./child-two.component.scss'],
})
export class ChildTwoComponent implements OnInit {
  constructor(public ts: TransferService) {}

  ngOnInit(): void {
    this.ts.counter$.subscribe((res) => {
      console.log(res);
    });
  }
}
