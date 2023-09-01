import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';

@listableObjectComponent('Era', ViewMode.StandalonePage)

@Component({
  selector: 'ds-era',
  templateUrl: './era.component.html',
  styleUrls: ['./era.component.scss']
})
export class EraComponent extends ItemComponent {



}
