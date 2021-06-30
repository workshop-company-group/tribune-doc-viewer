import { Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss']
})
export class NormalButtonComponent {

  @Input()
  public readonly disabled = false;

  @Output('button-click')
  public clickEmitter = new EventEmitter<void>();

  constructor() { }

}
