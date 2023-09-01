import { Bitstream } from './../../../core/shared/bitstream.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewerSwitcherService {
  private fileURL = new BehaviorSubject('');
  private fileFormat = new BehaviorSubject('');
  private fileName = new BehaviorSubject('');
  private bitstreamPath = new BehaviorSubject({});

  currentFileURL = this.fileURL.asObservable();
  currentFileFormat = this.fileFormat.asObservable();
  currentFileName = this.fileName.asObservable();

  currentBitstreamPath = this.bitstreamPath.asObservable();

  setFileURL(url: string) {
    this.fileURL.next(url);
  }

  setFileFormat(format: string) {
    this.fileFormat.next(format);
  }

  setFileName(name: string) {
    this.fileName.next(name);
  }

  setBitstreamPath(path) {
    this.bitstreamPath.next(path);
  }
}
