import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileViewRoutingModule } from './file-view-routing.module';
import { FileSelectModule } from '../file-select/file-select.module';
import { LocaleModule } from '../locale/locale.module';
import { SharedModule } from '../shared/shared.module';

import { FileTitleMenuComponent,
  FileTitleMenuItemComponent,
  FileViewPageComponent,
  FileViewerComponent,
  RecordBroadcastControlComponent } from './components';

import { DocumentViewComponent,
  MainSlideComponent,
  PdfViewComponent,
  SlideNavComponent,
  SlideProgressBarComponent,
  SlideThumbnailComponent } from './components/view-utils';

import { RecordBroadcastButtonComponent,
  RecordControlsComponent } from './components/record-broadcast-utils';

import { FileCloseConfirmationComponent,
  FileSelectConfirmationComponent,
  FinishRecordConfirmationComponent } from './components/confirmations';

import { DocumentTitlePipe } from './pipes';

@NgModule({
  declarations: [
    FileViewPageComponent,
    FileTitleMenuComponent,
    FileTitleMenuItemComponent,
    FileViewerComponent,
    RecordBroadcastControlComponent,
    DocumentViewComponent,
    MainSlideComponent,
    PdfViewComponent,
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
    LocaleModule,
    SharedModule,
  ],
})
export class FileViewModule { }
