import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service';

@Pipe({
  name: 'kwareLanguageSplit',
  pure:true
})
export class KwareLanguageSplitPipe implements PipeTransform {
  constructor(public localeService: LocaleService) {}
  result:any;

  transform(value: any): any {
    if(value && value.length > 0) {
      value.filter(metadata=>{
        (metadata.language !== null && metadata.language === this.localeService.getCurrentLanguageCode()) ? this.result = metadata.value: this.result= value[0].value;
       });
      return this.result;
    }
  
  }

}
