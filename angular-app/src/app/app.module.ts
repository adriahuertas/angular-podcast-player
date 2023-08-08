import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastListItemComponent } from './podcast-list-item/podcast-list-item.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';

@NgModule({
  declarations: [AppComponent, PodcastListComponent, PodcastListItemComponent, PodcastDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
