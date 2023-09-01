/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ds-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, OnChanges {
  @Input() docURL = '';
  @Input() locale = 'en';

  @ViewChild('documentViewer') documentViewer: any;

  iframeURL?: SafeResourceUrl = undefined;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.docURL) {
      this.iframeURL =
        this.domSanitizer.bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${this.docURL}&StartOn=1&Print=0&EmbedCode=0&ui=${this.locale}`);
      // this.domSanitizer.bypassSecurityTrustResourceUrl('//docs.google.com/gview?url=' + this.docURL + '&embedded=true');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.docURL.isFirstChange()) {
      this.iframeURL =
        this.domSanitizer
          .bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${changes.docURL.currentValue}&StartOn=1&Print=0&EmbedCode=0&ui=${this.locale}`);

      if (this.documentViewer) {
        this.documentViewer.src =
          this.domSanitizer.
            bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${changes.docURL.currentValue}&StartOn=1&Print=0&EmbedCode=0&ui=${this.locale}`);
      }
    }
  }
}
