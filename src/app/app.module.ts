import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UpdateModule } from './update/update.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// TODO: make import to page module
import { FileSelectModule } from './components/file-select/file-select.module';

import { FileTitleMenuComponent,
         FileTitleMenuItemComponent,
         FileViewBackgroundComponent,
         FileViewerComponent,
         RecordBroadcastControlComponent, } from './pages/file-view-page/components';
import { DocumentViewComponent,
         MainSlideComponent,
         PdfViewComponent,
         SlideButtonComponent,
         SlideNavComponent,
         SlideProgressBarComponent,
         SlideThumbnailComponent, } from './pages/file-view-page/components/view-utils';
import { RecordBroadcastButtonComponent,
         RecordControlsComponent } from './pages/file-view-page/components/record-broadcast-utils';
import { FileCloseConfirmationComponent,
         FileSelectConfirmationComponent,
         FinishRecordConfirmationComponent, } from './pages/file-view-page/components/confirmations';

import { DocumentTitlePipe } from './pages/file-view-page/pipes';

import { FileViewPageComponent,
         MainMenuPageComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuPageComponent,
    FileTitleMenuComponent,
    FileTitleMenuItemComponent,
    FileViewBackgroundComponent,
    FileViewPageComponent,
    FileViewerComponent,
    FileSelectConfirmationComponent,
    FileCloseConfirmationComponent,
    FinishRecordConfirmationComponent,
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
    DocumentTitlePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UpdateModule,
    AppRoutingModule,
    FileSelectModule, // TODO: import to page module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
