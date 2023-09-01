/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/core/shared/item.model';
import { HostWindowService } from '../../host-window.service';

@Component({
  selector: 'ds-media-viewer-toolbar',
  templateUrl: './media-viewer-toolbar.component.html',
  styleUrls: ['./media-viewer-toolbar.component.scss']
})
export class MediaViewerToolbarComponent {
  @Input() fileURL: string;
  @Input() fileName: string;
  @Input() fileFormat: string;
  @Input() closeViewer: () => void;
  @Input() openFullscreen: () => void;

  //  kware-edt responsive viewer
  @Input() item: Item; 
  public isXs: boolean;
  private subs: Subscription[] = [];
  // constructor() { }


  constructor( public hostWindowService: HostWindowService,
    private cdRef: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.subs.push(this.hostWindowService.isSm()
    .subscribe((status: boolean) => {
      this.isXs = status;
      this.cdRef.markForCheck();
    }));

 console.log('isXs ',this.isXs);
  }


  async addWatermarkToPdfFile(actionType: string) {
    const waterMarkImage = '../../../assets/images/watermark_image.png';
    const imageBuffer = await fetch(waterMarkImage).then(res => res.arrayBuffer());

    const existingPdfBytes = await
      fetch(decodeURIComponent(this.fileURL)).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const image = await pdfDoc.embedPng(imageBuffer);

    const pages = pdfDoc.getPages();
    pages.map(page => {
      const { width, height } = image.scale(0.4);

      page.drawImage(image, {
        x: page.getWidth() / 2 - width / 2,
        y: page.getHeight() / 2 - height / 2,
        width: width,
        height: height,
        opacity: 0.1,
        // rotate: degrees(45)
      });
    });
    const pdfBytes = await pdfDoc.save();

    if (actionType === 'download') {
      this.downloadFileAsPDF(this.fileName, pdfBytes);
    } else {
      this.printFileAsPDF(pdfBytes);
    }
  }

  downloadFileAsPDF(filename: string, byte: any) {
    console.log(decodeURIComponent(this.fileURL));
    let blob = new Blob([byte], { type: this.fileFormat });
    let link = document.createElement('a');
    const Url = URL.createObjectURL(blob);
    link.href = Url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(Url);
  }

  async downloadOtherFilesFormat() {
    let link = document.createElement('a');
    link.href = this.fileURL;
    link.download = this.fileName;
    link.click();
    URL.revokeObjectURL(this.fileURL);
  }

  printFileAsPDF(byte: any) {
    let blob = new Blob([byte], { type: this.fileFormat });
    const blobUrl = window.URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }

  async printOtherFilesFormats() {
    const fileBuffer = await
      fetch((this.fileURL)).then(res => res.arrayBuffer());
    let blob = new Blob([fileBuffer], { type: this.fileFormat });
    const blobUrl = window.URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  }
}
