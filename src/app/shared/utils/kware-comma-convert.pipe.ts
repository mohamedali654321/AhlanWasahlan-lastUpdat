import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service';

@Pipe({
  name: 'KwareCommaConvert',
  pure:true
})
export class KwareCommaConvertPipe implements PipeTransform {
  constructor(public localeService: LocaleService) {}


  transform(value: any): any {
    var regx = /;|,/gi
    if (value && (value?.toString().includes(',') || value?.toString().includes('،'))) {
      return this.localeService.getCurrentLanguageCode() === 'ar' ? value?.toString().replace(regx, "،") : value;
    }
    return value;
  }

}
