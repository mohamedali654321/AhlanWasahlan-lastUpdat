import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';

@listableObjectComponent('Activity', ViewMode.StandalonePage)

@Component({
  selector: 'ds-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends ItemComponent {



}
