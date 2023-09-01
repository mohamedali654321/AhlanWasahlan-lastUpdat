import { Injectable } from '@angular/core';
import { LocaleService } from '../locale/locale.service';
import { MetadataValue } from '../shared/metadata.models';


@Injectable({
  providedIn: 'root'
})
export class GetMetadataByLanguageService {

  constructor(public localeService: LocaleService) {}
  result:any;

  getMeatadataByLanguageByMetadataField(mdValue:MetadataValue[]): any {
    if(mdValue && mdValue.length > 0) {
      mdValue.filter(metadata=>{
        (metadata.language !== null && metadata.language === this.localeService.getCurrentLanguageCode()) ? this.result = metadata.value: this.result= mdValue[0].value;
       });
      return this.result;
    }
  
  }
}
