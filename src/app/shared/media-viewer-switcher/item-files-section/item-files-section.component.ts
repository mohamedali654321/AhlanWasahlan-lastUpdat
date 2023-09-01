import { concatMap } from 'rxjs/operators';
import { Component, Input, OnInit, QueryList, ViewChildren, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Item } from '../../../core/shared/item.model';
import { BehaviorSubject, map } from 'rxjs';
import { Bitstream } from '../../../core/shared/bitstream.model';
import { BitstreamDataService } from '../../../core/data/bitstream-data.service';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewerSwitcherService } from '../viewerSwitcherService/viewer-switcher-service.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'ds-item-files-section',
  templateUrl: './item-files-section.component.html',
  styleUrls: ['./item-files-section.component.scss']
})
export class ItemFilesSectionComponent implements OnInit {
  @Input() item: Item;
  @ViewChild('filesListContainer', { static: false }) filesListContainer: ElementRef;
  @ViewChildren('filesIds') filesIds: QueryList<any>;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  bitstreams$: BehaviorSubject<Bitstream[]>;
  isLoading: boolean;
  selectedFile: number;
  totalElements: number;
  totalPages: number;

  pageSize = 1000;
  itemSize = 20;

  constructor(
    protected bitstreamDataService: BitstreamDataService,
    protected notificationsService: NotificationsService,
    protected translateService: TranslateService,
    private viewerService: ViewerSwitcherService,
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.onFetchBitstreams();
  }

  onFetchBitstreams() {
    const startTime = performance.now();
    this.isLoading = true;
    this.bitstreams$ = new BehaviorSubject([]);
    this.httpClient.get(this.item?._links?.bundles?.href)
      .pipe(
        map((bundles: any) =>
          bundles?._embedded?.bundles?.find(bundle => bundle.name === "ORIGINAL")),
        concatMap((res: any) => this.httpClient.get(`${res?._links?.bitstreams?.href}?size=${this.pageSize}`)),
      )
      .subscribe((res: any) => {
        this.bitstreams$.next(res?._embedded?.bitstreams);
        this.totalElements = res?.page.totalElements;
        this.totalPages = res?.page.totalPages;
        this.isLoading = false;
        const endTime = performance.now();
        console.log(`Files response time = ${endTime - startTime} milliseconds`)
      });
  }

  selectedFileClickEvent($event: number) {
    this.selectedFile = $event;
  }

  emitMediaViewerSwitcher() {
    const currentElement = this.filesIds.toArray().find(file => file.fileIndex === this.selectedFile);
    this.viewerService.setFileFormat(currentElement.fileFormat);
    this.viewerService.setFileURL(
      currentElement.fileFormat === 'application/pdf' ?
        encodeURIComponent(currentElement.fileURL)
        : currentElement.fileURL);
    this.viewerService.setFileName(currentElement.bitstream?.name);
    currentElement.scrollToView();
  }

  getNextFile() {
    if (!this.selectedFile && this.selectedFile !== 0) {
      this.selectedFile = 0;
    } else {
      this.selectedFile++;
    }
    this.emitMediaViewerSwitcher();
  }

  getPrevFile() {
    this.selectedFile--;
    this.emitMediaViewerSwitcher();
  }

  trackByIdx(i) {
    return i;
  }
}
