import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastListItemComponent } from './podcast-list-item.component';

describe('PodcastListItemComponent', () => {
  let component: PodcastListItemComponent;
  let fixture: ComponentFixture<PodcastListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastListItemComponent]
    });
    fixture = TestBed.createComponent(PodcastListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
