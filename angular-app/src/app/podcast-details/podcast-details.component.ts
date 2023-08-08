import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { have24HoursPassed, convertMsToTime } from '../date-utilities';
import { PodcastData, PodcastDetails, EpisodeData } from 'src/interfaces';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss'],
})
export class PodcastDetailsComponent implements OnInit {
  @Input() podcastId: string = '';
  txtData: any = '';
  baseUrl: string =
    'https://itunes.apple.com/lookup?media=podcast&entity=podcastEpisode&limit=20&id=';
  isLoading: boolean = false;
  receivedPodcast: any;
  podcastDetails: PodcastDetails = {
    episodeNumber: 0,
    episodeList: [],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the podcast from the state
    this.route.params.subscribe((params) => {
      this.receivedPodcast = history.state.podcast;
    });

    this.isLoading = true;
    // La API dóna error de CORS, per això s'ha de fer servir un proxy
    // i la logica d'aquest component s'acaba complicant

    // Get podcastId from URL
    this.route.params.subscribe((params) => {
      this.podcastId = params['podcastId'];
    });
    const currentDate: Date = new Date();

    // Get previous fetching date from localStorage
    const fetchingDate: Date = new Date(
      localStorage.getItem(this.podcastId + '_fetchingDate') as string
    );

    // Check if podcast not in localStorage or if 24h have passed
    if (
      localStorage.getItem(this.podcastId) === null ||
      have24HoursPassed(fetchingDate, currentDate)
    ) {
      // Fetch data from API
      console.log('Fetching data from API');
      fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          this.baseUrl + this.podcastId
        )}`
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          this.txtData = JSON.parse(data.contents);
          // Get podcastDetails attributes from data;
          this.txtData['results'].map((item: any, i: number) => {
            if (i > 0) {
              this.podcastDetails.episodeList.push({
                id: item['trackId'],
                title: item['trackName'],
                date: item['releaseDate'],
                url: item['episodeUrl'],
                description: item['description'],
                duration: convertMsToTime(item['trackTimeMillis']),
              });
            }
          });
          this.podcastDetails.episodeNumber =
            this.txtData['results'][0]['trackCount'];
          // Save data to localStorage
          localStorage.setItem(
            this.podcastId,
            JSON.stringify(this.podcastDetails)
          );
          // Update fetching date
          localStorage.setItem(
            this.podcastId + '_fetchingDate',
            new Date().toString()
          );
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      // Get data from localStorage
      console.log('Getting data from localStorage');
      this.podcastDetails = JSON.parse(
        localStorage.getItem(this.podcastId) as string
      );
      this.isLoading = false;
      console.log(this.podcastDetails);
    }
  }
}
