import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent implements OnInit {

  @Output('slide-click')
  public readonly clickEmitter = new EventEmitter<void>();

  @Input()
  public readonly disabled: boolean = false;

  @Input('icon')
  public readonly iconSrc: string;

  constructor() { }

  ngOnInit(): void { }

}
