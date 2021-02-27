import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-broadcast-control',
  templateUrl: './record-broadcast-control.component.html',
  styleUrls: ['./record-broadcast-control.component.scss']
})
export class RecordBroadcastControlComponent implements OnInit {

  public wrapped: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
