import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
})
export class PodcastListComponent implements OnInit {
  private url: string =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
  private podcastData: Array<{}> = [];

  // Keys to use in localStorage
  private fetchingDateKey: string = 'fetchingDate';
  private podcastDataKey: string = 'podcastData';

  // Function to check if 24h has passed from previous fetching
  have24HoursPassed(): boolean {
    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
    // Retrieve previous fetching date
    const previousStoredData = localStorage.getItem(this.fetchingDateKey);
    if (previousStoredData !== null) {
      const currentDate = new Date();
      const previousDate = new Date(previousStoredData);
      return (
        currentDate.getTime() - new Date(previousDate).getTime() >
        millisecondsIn24Hours
      );
    }
    // Otherwise not previous fetch at all
    return true;
  }

  // When mounting the component
  ngOnInit(): void {
    // Check if it's been 24h from previous fetching
    if (this.have24HoursPassed()) {
      console.log('Fetching from External API');

      // Fetch data from API
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          // Save data to localStorage
          localStorage.setItem(
            this.podcastDataKey,
            JSON.stringify(data.feed.entry)
          );
          // Update fetching date
          localStorage.setItem(this.fetchingDateKey, new Date().toString());
          return (this.podcastData = data);
        });
    } else {
      // "Fetching" from localStorage
      console.log('Fetching from localStorage');
      this.podcastData = JSON.parse(
        localStorage.getItem(this.podcastDataKey) as string
      );
    }
  }
}
