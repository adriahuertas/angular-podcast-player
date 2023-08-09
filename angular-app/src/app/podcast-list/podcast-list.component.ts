import { Component, OnInit, NgModule } from '@angular/core';
import { ApiPodcastListService } from '../api-podcast-list.service';

import { PodcastData } from '../../interfaces';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
})
export class PodcastListComponent implements OnInit {
  isLoading: boolean = false;
  podcasts: Array<PodcastData> = [];
  searchText: string = '';

  constructor(private apiPodcastListService: ApiPodcastListService) {}
  // When mounting the component
  ngOnInit(): void {
    this.isLoading = true;
    this.apiPodcastListService.fetchPodcastListData().subscribe((data) => {
      this.podcasts = data;
      this.isLoading = false;
      console.log(this.podcasts);
    });
  }
}
