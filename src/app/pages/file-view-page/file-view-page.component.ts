import { Component, OnInit } from '@angular/core';

import { RecordBroadcastService } from './services';

@Component({
  selector: 'app-file-view-page',
  templateUrl: './file-view-page.component.html',
  styleUrls: ['./file-view-page.component.scss']
})
export class FileViewPageComponent implements OnInit {

  constructor(
    public readonly recordBroadcastService: RecordBroadcastService,
  ) { }

  ngOnInit(): void { }

}
