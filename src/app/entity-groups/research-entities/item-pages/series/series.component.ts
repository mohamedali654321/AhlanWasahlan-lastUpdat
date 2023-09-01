import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';

@listableObjectComponent('Series', ViewMode.StandalonePage)
@Component({
  selector: 'ds-series',
  styleUrls: ['./series.component.scss'],
  templateUrl: './series.component.html'
})
/**
 * The component for displaying metadata and relations of an item of the type Organisation Unit
 */
export class SeriesComponent extends ItemComponent {
}
