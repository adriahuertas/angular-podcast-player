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

  // Function to check if 24h has passed from previous fetching
  has24HoursPassed(): boolean {
    const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
    // Retrieve previous fetching date
    const previousStoredData = localStorage.getItem('fetchingDate');
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
    if (this.has24HoursPassed()) {
      console.log('Fetching from External API');
      // Fetch data from API
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => {
          // Save data to localStorage
          localStorage.setItem('podcastData', JSON.stringify(data.feed.entry));
          // Update fetching date
          localStorage.setItem('fetchingDate', new Date().toString());
          return (this.podcastData = data);
        });
    } else {
      // Fetching from localStorage
      console.log('Fetching from localStorage');
      this.podcastData = JSON.parse(
        localStorage.getItem('podcastData') as string
      );
    }
  }
}
