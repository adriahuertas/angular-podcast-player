import { SafeHtml } from "@angular/platform-browser";

export interface PodcastData {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
}

export interface EpisodeData {
  id: string; // trackId
  title: string; // trackName
  date: string; // releaseDate
  url: string; // episodeUrl
  description: SafeHtml; // description
  duration?: string; // trackTimeMillis
}

export interface PodcastDetails {
  episodeNumber: number;
  episodeList: Array<EpisodeData>;
}
