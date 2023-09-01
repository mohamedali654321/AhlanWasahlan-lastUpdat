import { Component, Input } from '@angular/core';
import { Script } from '../../scripts/script.model';
import { ScriptParameterType } from '../../scripts/script-parameter-type.model';
import { LocaleService } from 'src/app/core/locale/locale.service';

/**
 * Components that represents a help section for the script use and parameters
 */
@Component({
  selector: 'ds-script-help',
  templateUrl: './script-help.component.html',
  styleUrls: ['./script-help.component.scss']
})
export class ScriptHelpComponent {
  /**
   * The current script to show the help information for
   */
  @Input() script: Script;

  /**
   * The available script parameter types
   */
  parameterTypes = ScriptParameterType;

  //kware-edit
  constructor(
    public localeService : LocaleService , /* kware edit - call service from LocaleService */

  ){}

   //kware-edit
   // check for language
   lang:boolean =this.localeService.getCurrentLanguageCode()==='ar'? true : false

   // remove (-) from param names to create key
  createKey(str:string){
     console.log(this.lang)
     const res= str || str !== null ? str.replace(/-/g,"") : "";
     return res.toLocaleLowerCase();
   }
}
