import { Component, OnInit } from '@angular/core';
import { ApiPodcastListService } from '../api-podcast-list.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
})
export class PodcastListComponent implements OnInit {
  isLoading: boolean = false;
  podcastData: Array<{}> = [];

  constructor(private apiPodcastListService: ApiPodcastListService) {}
  // When mounting the component
  ngOnInit(): void {
    this.isLoading = true;
    this.apiPodcastListService.fetchPodcastListData().subscribe((data) => {
      this.podcastData = data;
      this.isLoading = false;
      console.log(this.podcastData);
    });
  }
}
