import { Component, } from '@angular/core';
import { FormControl, } from '@angular/forms';

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss']
})
export class GeneralPageComponent {

  public readonly languageControl = new FormControl('a');

  constructor() { }

}
