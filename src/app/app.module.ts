import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { UpdateModule } from './update/update.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { interceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    UpdateModule,
    AppRoutingModule,
  ],
  providers: [
    interceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
