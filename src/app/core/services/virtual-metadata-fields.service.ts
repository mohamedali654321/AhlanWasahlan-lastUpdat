import { Injectable } from '@angular/core';
import { RelationshipDataService } from '../data/relationship-data.service';
import { DSONameService } from '../breadcrumbs/dso-name.service';
import { ItemMetadataRepresentation } from '../shared/metadata-representation/item/item-metadata-representation.model';
import { Observable } from 'rxjs';
import { MetadataRepresentation, MetadataRepresentationType } from '../shared/metadata-representation/metadata-representation.model';
import { map } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';
import { Item } from '../shared/item.model';
@Injectable({
  providedIn: 'root'
})
export class VirtualMetadataFieldsService {

  mdRepresentation$: Observable<ItemMetadataRepresentation | null>;
  mdRepresentationItemRoute$: Observable<string | null>;
  mdRepresentationName$: Observable<string | null>;
  constructor(protected relationshipService: RelationshipDataService,
    protected dsoNameService: DSONameService,
    ) { }

    initVirtualProperties(item:Item, fieldName: string):  Observable<string | null> {
      this.mdRepresentation$ = item.allMetadata(fieldName)[0]?.isVirtual ?
        this.relationshipService.resolveMetadataRepresentation(item.allMetadata(fieldName)[0], item, 'Item')
          .pipe(
            map((mdRepresentation: MetadataRepresentation) =>
              mdRepresentation.representationType === MetadataRepresentationType.Item ? mdRepresentation as ItemMetadataRepresentation : null
            )
          ) : EMPTY;
          
      this.mdRepresentationItemRoute$ = this.mdRepresentation$.pipe(
        map((mdRepresentation: ItemMetadataRepresentation) => mdRepresentation ? getItemPageRoute(mdRepresentation) : null),
      );
      return  this.mdRepresentationName$ = this.mdRepresentation$.pipe(
        map((mdRepresentation: ItemMetadataRepresentation) => mdRepresentation ? this.dsoNameService.getName(mdRepresentation) : null),
      );
      
    }
}
