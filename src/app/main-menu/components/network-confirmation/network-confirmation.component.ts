import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-network-confirmation',
  templateUrl: './network-confirmation.component.html',
  styleUrls: ['./network-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
