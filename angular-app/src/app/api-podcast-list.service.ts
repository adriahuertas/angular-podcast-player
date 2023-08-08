import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { have24HoursPassed } from './date-utilities';

// Interface to select only the needed attributes to our PodcastListComponent
interface PodcastData {
  id: string;
  name: string;
  author: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiPodcastListService {
  private url: string =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
  public podcastData: Array<PodcastData> = [];

  // Keys to use in localStorage
  private fetchingDateKey: string = 'fetchingDate';
  private podcastDataKey: string = 'podcastData';

  constructor(private http: HttpClient) {}

  fetchPodcastListData(): Observable<any[]> {
    // Get previous fetching date from localStorage
    const fetchingDate: Date = new Date(
      localStorage.getItem(this.fetchingDateKey) as string
    );
    const currentDate: Date = new Date();
    // Check time
    if (!have24HoursPassed(fetchingDate, currentDate)) {
      // Get data from localStorage
      console.log('Getting data from localStorage');
      this.podcastData = JSON.parse(
        localStorage.getItem(this.podcastDataKey) as string
      );
      return of(this.podcastData);
    }
    // Otherwise, fetch data from API
    console.log('Fetching data from API');
    return this.http.get<any>(this.url).pipe(
      map((response) => {
        this.podcastData = response.feed.entry.map((item: any) => ({
          id: item['id']['attributes']['im:id'],
          name: item['im:name'].label,
          author: item['im:artist'].label,
          image: item['im:image'][0].label,
        }));

        // Save data to localStorage
        localStorage.setItem(
          this.podcastDataKey,
          JSON.stringify(this.podcastData)
        );
        // Update fetching date
        localStorage.setItem(this.fetchingDateKey, new Date().toString());
        return this.podcastData;
      })
    );
  }
}
