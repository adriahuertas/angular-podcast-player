import { TestBed } from '@angular/core/testing';

import { ApiPodcastListService } from './api-podcast-list.service';

describe('ApiPodcastListService', () => {
  let service: ApiPodcastListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPodcastListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
