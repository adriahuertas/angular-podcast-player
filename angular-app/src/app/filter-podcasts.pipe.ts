import { Pipe, PipeTransform } from '@angular/core';
import { PodcastData } from 'src/interfaces';

@Pipe({
  name: 'filterPodcasts'
})
export class FilterPodcastsPipe implements PipeTransform {

  transform(podcasts: Array<PodcastData>, searchText: string): Array<PodcastData> {
    // If no podcasts or no search text, return empty array
    if (!podcasts || !searchText) {
      return podcasts;
    }

    // Otherwise, filter the podcasts for title and author
    return podcasts.filter(podcast => {
      return podcast.title.toLowerCase().includes(searchText.toLowerCase()) || podcast.author.toLowerCase().includes(searchText.toLowerCase());
    });
  }

}
