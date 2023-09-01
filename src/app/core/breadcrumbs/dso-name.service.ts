import { Injectable } from '@angular/core';
import { hasValue, isEmpty, isNotEmpty } from '../../shared/empty.util';
import { DSpaceObject } from '../shared/dspace-object.model';
import { TranslateService } from '@ngx-translate/core';
import { Metadata } from '../shared/metadata.utils';
import { LocaleService } from '../locale/locale.service';
import { GetMetadataByLanguageService } from '../services/get-metadata-by-language.service';

/**
 * Returns a name for a {@link DSpaceObject} based
 * on its render types.
 */
@Injectable({
  providedIn: 'root'
})
export class DSONameService {

    //kware-edit check locale
    localeAr: boolean;
    localeEn: boolean;
    arabicLang: boolean;
    englishLang: boolean;
    title: string; // kware-edit
    AdministrationName: string; // kware-edit
    OrgUnitName:string // kware-edit
    PlaceName:string // kware-edit
    SiteName:string // kware-edit
    EventName:string // kware-edit
    EraName:string // kware-edit
    ActivityName:string // kware-edit
    SeriesName: string // kware-edit
    ProjectName: string // kware-edit

  

  constructor(private translateService: TranslateService,
    public getMetadataByLanguageService :GetMetadataByLanguageService,
    public localeService: LocaleService , /* kware edit - call service from LocaleService */

    ) {

  }

  /**
   * Functions to generate the specific names.
   *
   * If this list ever expands it will probably be worth it to
   * refactor this using decorators for specific entity types,
   * or perhaps by using a dedicated model for each entity type
   *
   * With only two exceptions those solutions seem overkill for now.
   */
  private readonly factories = {
    EPerson: (dso: DSpaceObject): string => {
      const firstName = dso.firstMetadataValue('eperson.firstname');
      const lastName = dso.firstMetadataValue('eperson.lastname');
      if (isEmpty(firstName) && isEmpty(lastName)) {
        return this.translateService.instant('dso.name.unnamed');
      } else if (isEmpty(firstName) || isEmpty(lastName)) {
        return firstName || lastName;
      } else {
        return `${firstName} ${lastName}`;
      }
    },
    Person: (dso: DSpaceObject): string => {
      const familyName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.familyName')) ;
      const givenName = this.localeService.getStringByLocale(dso.firstMetadataValue('person.givenName'));
      this.localeAr = this.localeService.getCurrentLanguageCode() === 'ar';
      this.localeEn = this.localeService.getCurrentLanguageCode()   === 'en';
      if ((isEmpty(familyName) || isEmpty(givenName)) && isNotEmpty(dso.firstMetadataValue('dspace.object.owner')) && isEmpty(dso.firstMetadataValue('person.name'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dspace.object.owner')) || dso.name;
      }
      else if( !!dso.firstMetadataValue('person.name')){
        return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('person.name')) || dso.name;
      }

      else if (isEmpty(familyName) || isEmpty(givenName)) {
        return familyName || givenName;
      }else if   ((isEmpty(familyName) && isEmpty(givenName))&& isEmpty(dso.firstMetadataValue('dspace.object.owner'))) {
        return this.localeService.getStringByLocale(dso.firstMetadataValue('dc.title')) || dso.name;
      } 
     
      //  else {
      //   return this.convertComma(`${familyName}, ${givenName}`);
      // }
    },
    OrgUnit: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('organization.legalName'));
    },
    Administration: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('organization.childLegalName'));
    },
    Place: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('place.legalName'));
    },
    Event: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('event.title'));
    },
    Era: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('era.title'));
    },
    Series: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('series.name'));
    },
    Project: (dso: DSpaceObject): string => {
      return  this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('project.name'));
    },
    Site: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('place.childLegalName'));
    },
    Activity: (dso: DSpaceObject): string => {
      return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('event.childTitle'));
    },
    Default: (dso: DSpaceObject): string => {
        return this.getMetadataByLanguageService.getMeatadataByLanguageByMetadataField(dso.allMetadata('dc.titl')) || dso.name || this.translateService.instant('dso.name.untitled');

    }
  };

  /**
   * Get the name for the given {@link DSpaceObject}
   *
   * @param dso  The {@link DSpaceObject} you want a name for
   */
  getName(dso: DSpaceObject | undefined): string {
    if (dso) {
      const types = dso.getRenderTypes();
      const match = types
        .filter((type) => typeof type === 'string')
        .find((type: string) => Object.keys(this.factories).includes(type)) as string;

      let name;
      if (hasValue(match)) {
        name = this.localeService.getStringByLocale(this.factories[match](dso));
      }
      if (isEmpty(name)) {
        name = this.localeService.getStringByLocale(this.factories.Default(dso)) ;
      }
      return this.localeService.getStringByLocale(name);
    } else {
      return '';
    }
  }

  /**
   * Gets the Hit highlight
   *
   * @param object
   * @param dso
   *
   * @returns {string} html embedded hit highlight.
   */
  getHitHighlights(object: any, dso: DSpaceObject): string {
    const types = dso.getRenderTypes();
    const entityType = types
      .filter((type) => typeof type === 'string')
      .find((type: string) => (['Person', 'OrgUnit']).includes(type)) as string;
    if (entityType === 'Person') {
      const familyName = this.firstMetadataValue(object, dso, 'person.familyName');
      const givenName = this.firstMetadataValue(object, dso, 'person.givenName');
      if (isEmpty(familyName) && isEmpty(givenName)) {
        return this.firstMetadataValue(object, dso, 'dc.title') || dso.name;
      } else if (isEmpty(familyName) || isEmpty(givenName)) {
        return familyName || givenName;
      }
      return `${familyName}, ${givenName}`;
    } else if (entityType === 'OrgUnit') {
      return this.firstMetadataValue(object, dso, 'organization.legalName');
    }
    return this.firstMetadataValue(object, dso, 'dc.title') || dso.name || this.translateService.instant('dso.name.untitled');
  }

  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param object
   * @param dso
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   *
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(object: any, dso: DSpaceObject, keyOrKeys: string | string[]): string {
    return Metadata.firstValue([object.hitHighlights, dso.metadata], keyOrKeys);
  }
  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str: any){
    let newstr = '';
    if (this.localeService.getCurrentLanguageCode() === 'ar'){
      let regx = /;|,/gi;
     newstr = str.replace(regx, '،');
     return newstr;

    } else {
      return str;
    }
  }
}
