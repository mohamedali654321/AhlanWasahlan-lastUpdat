import { Observable } from 'rxjs';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { LocaleService } from '../../core/locale/locale.service';
import { ViewerSwitcherService } from './viewerSwitcherService/viewer-switcher-service.service';
import { Item } from 'src/app/core/shared/item.model';

@Component({
  selector: 'ds-media-viewer-switcher',
  templateUrl: './media-viewer-switcher.component.html',
  styleUrls: ['./media-viewer-switcher.component.scss']
})
export class MediaViewerSwitcherComponent implements OnInit, OnDestroy {
  @ViewChild('pdfJsViewer') pdfJsViewer: any;
  @ViewChild('mediaViewerId') mediaViewerRef: any;
  @Input() item: Item;  //mohamed-edit
  localeCode = '';
  fileURL = '';
  fileFormat = '';
  fileName = '';

  bitstreamPath;

  msFilesFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-excel'
  ];

  constructor(
    private viewerSwitcherService: ViewerSwitcherService,
    private localeService: LocaleService
  ) { }



  ngOnInit() {
    this.localeCode = this.localeService.getCurrentLanguageCode();
    this.viewerSwitcherService.currentFileURL.subscribe(url => {
      if (url !== this.fileURL) {
        this.fileURL = url;
        if (this.pdfJsViewer) {
          this.pdfJsViewer.pdfSrc = url;
          this.pdfJsViewer.refresh();
        }
      }
    });
    this.viewerSwitcherService.currentFileFormat.subscribe(format => this.fileFormat = format);
    this.viewerSwitcherService.currentFileName.subscribe(name => this.fileName = name);
    this.viewerSwitcherService.currentBitstreamPath.subscribe(path => this.bitstreamPath = path);
  }

  ngOnDestroy(): void {
    this.viewerSwitcherService.setFileURL('');
    this.viewerSwitcherService.setFileFormat('');
  }

  downloadOtherFileFormat() {
    let link = document.createElement('a');
    link.href = this.fileURL;
    let fileName = this.fileName;
    link.download = fileName;
    link.click();
  }

  closeViewer = (): void => {
    this.viewerSwitcherService.setFileURL('');
    this.viewerSwitcherService.setFileFormat('');
  };

  openFullscreen() {
    // if (this.mediaViewerRef.nativeElement.requestFullscreen) {
    //   this.mediaViewerRef.nativeElement.requestFullscreen();
    // } else if (this.mediaViewerRef.nativeElement.msRequestFullscreen) {
    //   this.mediaViewerRef.nativeElement.msRequestFullscreen();
    // } else if (this.mediaViewerRef.nativeElement.mozRequestFullScreen) {
    //   this.mediaViewerRef.nativeElement.mozRequestFullScreen();
    // } else if (this.mediaViewerRef.nativeElement.webkitRequestFullscreen) {
    //   this.mediaViewerRef.nativeElement.webkitRequestFullscreen();
    // }
  }
}
