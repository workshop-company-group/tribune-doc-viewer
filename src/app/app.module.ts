import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UpdateModule } from './update/update.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FileViewPageComponent, 
         MainMenuPageComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent, 
    MainMenuPageComponent, 
    FileViewPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    UpdateModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
