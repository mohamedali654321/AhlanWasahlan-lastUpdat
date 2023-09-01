import { CollectionDropdownComponent, CollectionListEntry } from './collection-dropdown.component';
import { ThemedComponent } from '../theme-support/themed.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ds-themed-collection-dropdown',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
})
export class ThemedCollectionDropdownComponent extends ThemedComponent<CollectionDropdownComponent> {

  @Input() entityType: string;

    /*kware start edit
   - get selected collection from SubmissionFormCollectionComponent
   - send  searchListCollectionLength to SubmissionFormCollectionComponent to check if length > 1
   **/
   @Input() selectedCollection: string;

   @Output() searchListCollectionLength = new EventEmitter<number>();
 
 /*kware end edit**/

  @Output() searchComplete: EventEmitter<any> = new EventEmitter();

  @Output() theOnlySelectable: EventEmitter<CollectionListEntry> = new EventEmitter();

  @Output() selectionChange = new EventEmitter();

/* 
kware start edit 
-add (selectedCollection , searchListCollectionLength) to inAndOutputNames
**/
protected inAndOutputNames: (keyof CollectionDropdownComponent & keyof this)[] = ['entityType','searchComplete', 'theOnlySelectable', 'selectionChange','searchListCollectionLength','selectedCollection'];
/* kware end edit***/
  protected getComponentName(): string {
    return 'CollectionDropdownComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/shared/collection-dropdown/collection-dropdown.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./collection-dropdown.component`);
  }
}
