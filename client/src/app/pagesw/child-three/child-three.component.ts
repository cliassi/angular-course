import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';

@Component({
  selector: 'app-child-three',
  templateUrl: './child-three.component.html',
  styleUrls: ['./child-three.component.scss'],
})
export class ChildThreeComponent implements OnInit {
  constructor(public ts: TransferService) {}

  ngOnInit(): void {}
}
