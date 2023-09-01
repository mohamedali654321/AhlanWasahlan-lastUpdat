import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'ds-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('videoPlayer', { static: true }) videoPlayer: ElementRef;

  // See options: https://videojs.com/guides/options
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    language: string,
    sources: {
      src: string,
      type: string,
    }[],
  };

  @Input() src = '';

  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    this.player = videojs(this.videoPlayer.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
