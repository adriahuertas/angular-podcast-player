import { SafeHtml } from "@angular/platform-browser";

export interface PodcastData {
  id: string;
  title: string;
  author: string;
  image: string;
  biggerImage?: string // To get 170x170 image link also
  description: string;
}

export interface EpisodeData {
  id: string; // trackId
  title: string; // trackName
  date: string; // releaseDate
  url: string; // episodeUrl
  description: any; // description
  duration?: string; // trackTimeMillis
}

export interface PodcastDetails {
  episodeNumber: number;
  episodeList: Array<EpisodeData>;
}
