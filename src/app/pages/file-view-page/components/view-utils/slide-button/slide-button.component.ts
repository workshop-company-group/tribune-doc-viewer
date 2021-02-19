import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent implements OnInit {

  @Input()
  public readonly disabled: boolean = false;

  @Input()
  public readonly iconSrc: string;

  @Input()
  public readonly disabledIconSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
