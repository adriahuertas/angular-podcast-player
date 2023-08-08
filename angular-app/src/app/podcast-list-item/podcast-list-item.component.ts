import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PodcastData } from '../../interfaces';

@Component({
  selector: 'app-podcast-list-item',
  templateUrl: './podcast-list-item.component.html',
  styleUrls: ['./podcast-list-item.component.scss'],
})
export class PodcastListItemComponent {
  @Input() podcast: PodcastData = {
    id: '',
    title: '',
    author: '',
    image: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  handlePodcastClick(): void {
    this.router.navigate(['/podcast', this.podcast.id]);
  }
}
