import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';

@listableObjectComponent('Event', ViewMode.StandalonePage)

@Component({
  selector: 'ds-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent extends ItemComponent {



}
