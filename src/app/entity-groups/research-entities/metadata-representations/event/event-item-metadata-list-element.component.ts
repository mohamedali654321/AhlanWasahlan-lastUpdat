import { Component } from '@angular/core';
import { metadataRepresentationComponent } from '../../../../shared/metadata-representation/metadata-representation.decorator';
import { MetadataRepresentationType } from '../../../../core/shared/metadata-representation/metadata-representation.model';
import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { LocaleService } from 'src/app/core/locale/locale.service';

@metadataRepresentationComponent('Event', MetadataRepresentationType.Item)
@Component({
  selector: 'ds-event-item-metadata-list-element',
  templateUrl: './event-item-metadata-list-element.component.html'
})
/**
 * The component for displaying an item of the type OrgUnit as a metadata field
 */
export class EventItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
  constructor(public localeService: LocaleService  /* kware edit - call service from LocaleService */){super();}

}
