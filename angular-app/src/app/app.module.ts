import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastListItemComponent } from './podcast-list-item/podcast-list-item.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { FormsModule } from '@angular/forms';
import { FilterPodcastsPipe } from './filter-podcasts.pipe';

@NgModule({
  declarations: [AppComponent, PodcastListComponent, PodcastListItemComponent, PodcastDetailsComponent, FilterPodcastsPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
