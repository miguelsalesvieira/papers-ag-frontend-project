import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableComponent } from './components/table/table.component';

import { BlocksPageComponent } from './pages/blocks/blocks.component';
import { BlockPageComponent } from './pages/block/block.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BlocksPageComponent,
    BlockPageComponent,
    NotFoundPageComponent,
    LandingPageComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
