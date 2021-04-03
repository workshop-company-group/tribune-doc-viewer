import { Component, EventEmitter, Output, } from '@angular/core';

@Component({
  selector: 'app-normal-button',
  templateUrl: './normal-button.component.html',
  styleUrls: ['./normal-button.component.scss']
})
export class NormalButtonComponent {

  @Output('button-click')
  public clickEmitter = new EventEmitter<void>();

  constructor() { }

}
