import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Item } from '../../../../core/shared/item.model';
import { getItemPageRoute } from '../../../item-page-routing-paths';
import { RouteService } from '../../../../core/services/route.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { getDSpaceQuery, isIiifEnabled, isIiifSearchEnabled } from './item-iiif-utils';
import { filter, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer'; //kware-edit
import { select, Store } from '@ngrx/store'; //kware-edit
import { isAuthenticated } from 'src/app/core/auth/selectors'; //kware-edit
import { hasValue } from 'src/app/shared/empty.util'; //kware-edit
import { ViewerSwitcherService } from 'src/app/shared/media-viewer-switcher/viewerSwitcherService/viewer-switcher-service.service'; //mohamed-edit
import { HostWindowService } from 'src/app/shared/host-window.service';
@Component({
  selector: 'ds-item',
  template: ''
})
/**
 * A generic component for displaying metadata and relations of an item
 */
export class ItemComponent implements OnInit {
  @Input() object: Item;

  /**
   * This regex matches previous routes. The button is shown
   * for matching paths and hidden in other cases.
   */
  previousRoute = /^(\/search|\/browse|\/collections|\/admin\/search|\/mydspace)/;

  /**
   * Used to show or hide the back to results button in the view.
   */
  showBackButton: Observable<boolean>;

  /**
   * Route to the item page
   */
  itemPageRoute: string;


relationsItems;
  /**
   * Enables the mirador component.
   */
  iiifEnabled: boolean;

  /**
   * Used to configure search in mirador.
   */
  iiifSearchEnabled: boolean;

  /**
   * The query term from the previous dspace search.
   */
  iiifQuery$: Observable<string>;

  mediaViewer;

  isAuthorized$: Observable<boolean>;  //kware-edit

  fileUrl: string;  //kware-edit

  locale:any;  //kware-edit

  lang:boolean  //kware-edit

  public isXs= new BehaviorSubject(false);
  private subs: Subscription[] = [];
  constructor(protected routeService: RouteService,
    public store: Store<AppState>, //kware-edit
    protected viewerSwitcher: ViewerSwitcherService, //mohamed-edit
    protected hostWindowService: HostWindowService,
    protected cdRef: ChangeDetectorRef,
              protected router: Router) {
    this.mediaViewer = environment.mediaViewer;
  }

  /**
   * The function used to return to list from the item.
   */
  back = () => {
    this.routeService.getPreviousUrl().pipe(
          take(1)
        ).subscribe(
          (url => {
            this.router.navigateByUrl(url);
          })
        );
  };

  ngOnInit(): void {
  //   console.log(this.relationsItems)
  // this.relationsItems=this.object.metadataAsList.filter(md=>{return md.authority !== null && md.authority.includes('virtual::')  && !md.key.includes('relation')});
  // console.log(this.relationsItems)

    this.subs.push(this.hostWindowService.isXs()
    .subscribe((status: boolean) => {
      this.isXs.next(status);
      this.cdRef.markForCheck();
    }));

    this.viewerSwitcher.currentFileURL.subscribe(url => this.fileUrl = url); //mohamed-edit
    if (typeof window === 'object' && hasValue(window.localStorage)) {
      this.locale = window.localStorage.getItem('selectedLangCode');
     }
     //kware-edit
     this.lang =this.locale ==='ar'? true : false;
     this.isAuthorized$ = this.store.pipe(select(isAuthenticated)); //kware-edi

    this.itemPageRoute = getItemPageRoute(this.object);
    // hide/show the back button
    this.showBackButton = this.routeService.getPreviousUrl().pipe(
      filter(url => this.previousRoute.test(url)),
      take(1),
      map(() => true)
    );
    // check to see if iiif viewer is required.
    this.iiifEnabled = isIiifEnabled(this.object);
    this.iiifSearchEnabled = isIiifSearchEnabled(this.object);
    if (this.iiifSearchEnabled) {
      this.iiifQuery$ = getDSpaceQuery(this.object, this.routeService);
    }
  }

  getCreativeCommonsIcons(uri:string):any[]{
    if(typeof uri === 'string' && uri && (uri?.includes('licenses/')|| uri?.includes('publicdomain/'))){
       return uri?.includes('licenses/') ?  uri?.split('licenses/')[1]?.split('/')[0]?.split('-') : uri?.split('publicdomain/')[1]?.split('/')[0]?.split('-') ;
    }
    else{return;}

  }
}
