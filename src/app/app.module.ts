import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';

import { BlocksPageComponent } from './pages/blocks/blocks.component';
import { BlockPageComponent } from './pages/block/block.component';
import { InfoPageComponent } from './pages/info/info.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableComponent,
    InfoPageComponent,
    BlocksPageComponent,
    BlockPageComponent,
    NotFoundPageComponent,
  ],
  imports: [BrowserModule, CommonModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
