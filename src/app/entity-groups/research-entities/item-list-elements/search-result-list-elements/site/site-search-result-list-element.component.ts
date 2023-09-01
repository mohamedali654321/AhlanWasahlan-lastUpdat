import { Component } from '@angular/core';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultListElementComponent } from '../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';

@listableObjectComponent('SiteSearchResult', ViewMode.ListElement)
@Component({
  selector: 'ds-site-search-result-list-element',
  styleUrls: ['./site-search-result-list-element.component.scss'],
  templateUrl: './site-search-result-list-element.component.html'
})
/**
 * The component for displaying a list element for an item search result of the type Organisation Unit
 */
export class SiteSearchResultListElementComponent extends ItemSearchResultListElementComponent {

  /**
   * Display thumbnail if required by configuration
   */
  showThumbnails: boolean;

  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = this.appConfig.browseBy.showThumbnails;
  }

}
