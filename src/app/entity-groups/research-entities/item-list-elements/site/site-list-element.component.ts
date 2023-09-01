import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';

@listableObjectComponent('Site', ViewMode.ListElement)
@Component({
  selector: 'ds-site-list-element',
  styleUrls: ['./site-list-element.component.scss'],
  templateUrl: './site-list-element.component.html'
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class SiteListElementComponent extends AbstractListableElementComponent<Item> {
}
