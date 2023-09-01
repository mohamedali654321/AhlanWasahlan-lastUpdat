import { Component,Inject } from '@angular/core';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultListElementComponent } from '../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { ItemMetadataRepresentation } from 'src/app/core/shared/metadata-representation/item/item-metadata-representation.model';
import { Observable } from 'rxjs';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { MetadataRepresentation, MetadataRepresentationType } from 'src/app/core/shared/metadata-representation/metadata-representation.model';
import { RelationshipDataService } from 'src/app/core/data/relationship-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { map } from 'rxjs/operators';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';
import { APP_CONFIG, AppConfig } from 'src/config/app-config.interface';
import { TruncatableService } from 'src/app/shared/truncatable/truncatable.service';
import { LinkService } from 'src/app/core/cache/builders/link.service';
import { VirtualMetadataFieldsService } from 'src/app/core/services/virtual-metadata-fields.service';
@listableObjectComponent('AdministrationSearchResult', ViewMode.ListElement)
@Component({
  selector: 'ds-sub-org-unit-search-result-list-element',
  styleUrls: ['./sub-org-unit-search-result-list-element.component.scss'],
  templateUrl: './sub-org-unit-search-result-list-element.component.html'
})
/**
 * The component for displaying a list element for an item search result of the type Organisation Unit
 */
export class SubOrgUnitSearchResultListElementComponent extends ItemSearchResultListElementComponent {

  /**
   * Display thumbnail if required by configuration
   */
  showThumbnails: boolean;



 constructor(
  protected truncatableService: TruncatableService,
  protected virtualMetadataFieldsService:VirtualMetadataFieldsService ,
                     protected dsoNameService: DSONameService,
                     protected linkService: LinkService, //kware-edit
                     @Inject(APP_CONFIG) protected appConfig?: AppConfig
) {
   super(truncatableService,dsoNameService,linkService);
 }


 
}
