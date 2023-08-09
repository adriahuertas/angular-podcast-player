import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PodcastListItemComponent } from './podcast-list-item/podcast-list-item.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: PodcastListComponent },
  { path: 'podcast/:podcastId', component: PodcastDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
