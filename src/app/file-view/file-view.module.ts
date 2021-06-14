import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileViewRoutingModule } from './file-view-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FileSelectModule } from '../file-select/file-select.module';

import { FileViewPageComponent, } from './components';

import { FileTitleMenuComponent,
  FileTitleMenuItemComponent,
  FileViewBackgroundComponent,
  FileViewerComponent,
  RecordBroadcastControlComponent, } from './components';

import { DocumentViewComponent,
  MainSlideComponent,
  PdfViewComponent,
  SlideButtonComponent,
  SlideNavComponent,
  SlideProgressBarComponent,
  SlideThumbnailComponent, } from './components/view-utils';

import { RecordBroadcastButtonComponent,
  RecordControlsComponent, } from './components/record-broadcast-utils';

import { FileCloseConfirmationComponent,
  FileSelectConfirmationComponent,
  FinishRecordConfirmationComponent, } from './components/confirmations';

import { DocumentTitlePipe, } from './pipes';

@NgModule({
  declarations: [
    FileViewPageComponent,
    FileTitleMenuComponent,
    FileTitleMenuItemComponent,
    FileViewBackgroundComponent,
    FileViewerComponent,
    RecordBroadcastControlComponent,
    DocumentViewComponent,
    MainSlideComponent,
    PdfViewComponent,
    SlideButtonComponent,
    SlideNavComponent,
    SlideProgressBarComponent,
    SlideThumbnailComponent,
    RecordBroadcastButtonComponent,
    RecordControlsComponent,
    FileCloseConfirmationComponent,
    FileSelectConfirmationComponent,
    FinishRecordConfirmationComponent,
    DocumentTitlePipe,
  ],
  imports: [
    CommonModule,
    FileViewRoutingModule,
    FileSelectModule,
    SharedModule,
  ]
})
export class FileViewModule { }
