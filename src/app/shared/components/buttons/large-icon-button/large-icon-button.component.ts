import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-icon-button',
  templateUrl: './large-icon-button.component.html',
  styleUrls: ['./large-icon-button.component.scss']
})
export class LargeIconButtonComponent implements OnInit {

  @Input('src')
  public iconSource: string;

  constructor() { }

  ngOnInit(): void {
  }

}
