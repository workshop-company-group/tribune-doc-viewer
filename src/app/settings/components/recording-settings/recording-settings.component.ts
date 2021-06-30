import { Component, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';

@Component({
  selector: 'app-recording-settings',
  templateUrl: './recording-settings.component.html',
  styleUrls: ['./recording-settings.component.scss']
})
export class RecordingSettingsComponent implements OnInit {

  public readonly pathControl = new FormControl();

  public readonly saveToggle = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
