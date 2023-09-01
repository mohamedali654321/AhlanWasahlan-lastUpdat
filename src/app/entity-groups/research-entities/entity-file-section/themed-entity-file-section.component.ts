// import { ThemedComponent } from '../../../../shared/theme-support/themed.component';
// import { FileSectionComponent } from './file-section.component';
// import {Component, Input} from '@angular/core';
// import {Item} from '../../../../core/shared/item.model';

import {Component, Input} from '@angular/core';
import { Item } from "src/app/core/shared/item.model";
import { FileSectionComponent } from "src/app/item-page/simple/field-components/file-section/file-section.component";
import { ThemedComponent } from "src/app/shared/theme-support/themed.component";
import { EntityFileSectionComponent } from './entity-file-section.component';

@Component({
    selector: 'ds-themed-entity-item-page-file-section',
    templateUrl: './themed.component.html',
})
export class ThemedEntityFileSectionComponent extends ThemedComponent<EntityFileSectionComponent> {

    @Input() item: Item;

    protected inAndOutputNames: (keyof EntityFileSectionComponent & keyof this)[] = ['item'];

    protected getComponentName(): string {
        return 'EntityFileSectionComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        // return import(`../../../../../themes/${themeName}/app/entity-groups/research-entities/entity-file-secion/file-section.component`);
        return import(`src/themes/${themeName}/app/entity-groups/research-entities/entity-file-secion/entityfile-section.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./entity-file-section.component`);
    }

}
