import { Component, Input, OnInit } from '@angular/core';
import { MediaViewerItem } from 'src/app/core/shared/media-viewer-item.model';
// import { MediaViewerItem } from '../../../core/shared/media-viewer-item.model';

/**
 * This componenet renders a video viewer and playlist for the media viewer
 */
@Component({
  selector: 'ds-entity-media-viewer-video',
  templateUrl: './entity-media-viewer-video.component.html',
  styleUrls: ['./entity-media-viewer-video.component.scss'],
})
export class EntityMediaViewerVideoComponent implements OnInit {
  @Input() medias: MediaViewerItem[];

  filteredMedias: MediaViewerItem[];

  isCollapsed: boolean;
  currentIndex = 0;

  replacements = {
    video: './assets/images/replacement_video.svg',
    audio: './assets/images/replacement_audio.svg',
    image: './assets/images/replacement_image.svg',
  };

  replacementThumbnail: string;

  ngOnInit() {
    this.isCollapsed = false;
    this.filteredMedias = this.medias.filter(
      (media) => media.format === 'audio' || media.format === 'video' || media.format === 'image'
    );
  }

  /**
   * This method sets the reviced index into currentIndex
   * @param index Selected index
   */
  selectedMedia(index: number) {
    this.currentIndex = index;
  }

  /**
   * This method increade the number of the currentIndex
   */
  nextMedia() {
    this.currentIndex++;
  }

  /**
   * This method decrese the number of the currentIndex
   */
  prevMedia() {
    this.currentIndex--;
  }
}
