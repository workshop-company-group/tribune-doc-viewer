import { Component, OnInit } from '@angular/core';

import { WindowStateService } from '../../shared/services/window-state.service';
import { UpdateService } from '../../update/services/update.service';

import { ConversionService } from '../../shared/services/conversion.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss']
})
export class MainMenuPageComponent implements OnInit {

  constructor(private stateService: WindowStateService,
              public updateService: UpdateService,
              private conv: ConversionService) {
    this.conv.convertDocument('test');
  }

  ngOnInit(): void {
  }

  public openFileView(): void {
    console.log('File view page called');
  }

  public openSettings(): void {
    console.log('Settings page called');
  }

  public quitApplication(): void {
    this.stateService.exit();
  }

}
