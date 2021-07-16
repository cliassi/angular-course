import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.scss'],
})
export class ChildOneComponent implements OnInit {
  @Input() fromParent: number = 0;
  @Output() decreament = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  sub() {
    this.fromParent--;
    this.decreament.emit(this.fromParent);
  }
}
