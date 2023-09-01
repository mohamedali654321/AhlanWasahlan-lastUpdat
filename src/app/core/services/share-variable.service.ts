import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})

export class SharedVariableService {


private fileURL = new Subject<string>();

private fileRestrictedURL = new Subject<string>();

private specializations = new BehaviorSubject([]);

currentSpecializations = this.specializations.asObservable();


private college = new BehaviorSubject('');

currentCollege = this.college.asObservable();


ngOnDestroy(): void {
  return null;

}

setSpecializations (specializations: any) {
  this.specializations.next(specializations);
}

setCollege (college: any) {
  this.college.next(college);
}

  /*
   * @return {Observable<string>} : siblingMsg
   */
  public getMessage(): Observable<string> {
    return this.fileURL.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: string): void {
    this.fileURL.next(message);
  }


    /*
   * @return {Observable<string>} : siblingMsg
   */
    public getRestrictedMessage(): Observable<string> {
      return this.fileRestrictedURL.asObservable();
    }
    /*
     * @param {string} message : siblingMsg
     */
    public updateRestrictedMessage(message: string): void {
      this.fileRestrictedURL.next(message);
    }



}
