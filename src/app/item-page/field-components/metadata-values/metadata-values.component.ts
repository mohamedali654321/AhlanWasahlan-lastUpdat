import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MetadataValue } from '../../../core/shared/metadata.models';
import { APP_CONFIG, AppConfig } from '../../../../config/app-config.interface';
import { BrowseDefinition } from '../../../core/shared/browse-definition.model';
import { hasValue } from '../../../shared/empty.util';
import { VALUE_LIST_BROWSE_DEFINITION } from '../../../core/shared/value-list-browse-definition.resource-type';
import { LocaleService } from 'src/app/core/locale/locale.service';

/**
 * This component renders the configured 'values' into the ds-metadata-field-wrapper component.
 * It puts the given 'separator' between each two values.
 */
@Component({
  selector: 'ds-metadata-values',
  styleUrls: ['./metadata-values.component.scss'],
  templateUrl: './metadata-values.component.html'
})
export class MetadataValuesComponent implements OnChanges {

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public localeService: LocaleService,
  ) {
  }

  /**
   * The metadata values to display
   */
  @Input() mdValues: MetadataValue[];
  Values: any;
  /**
   * The seperator used to split the metadata values (can contain HTML)
   */
  @Input() separator: string;

  /**
   * The label for this iteration of metadata values
   */
  @Input() label: string;

     // kware edit
     link: any;
     check: boolean;
     externalLinks:boolean;
 
  /**
   * Whether the {@link MarkdownPipe} should be used to render these metadata values.
   * This will only have effect if {@link MarkdownConfig#enabled} is true.
   * Mathjax will only be rendered if {@link MarkdownConfig#mathjax} is true.
   */
  @Input() enableMarkdown = false;

  /**
   * Whether any valid HTTP(S) URL should be rendered as a link
   */
  @Input() urlRegex?;

  /**
   * This variable will be true if both {@link environment.markdown.enabled} and {@link enableMarkdown} are true.
   */
  renderMarkdown;

  @Input() browseDefinition?: BrowseDefinition;

  ngOnChanges(changes: SimpleChanges): void {
    this.renderMarkdown = !!this.appConfig.markdown.enabled && this.enableMarkdown;
  }

  /**
   * Does this metadata value have a configured link to a browse definition?
   */
  hasBrowseDefinition(): boolean {
    return hasValue(this.browseDefinition);
  }

  /**
   * Does this metadata value have a valid URL that should be rendered as a link?
   * @param value A MetadataValue being displayed
   */
  hasLink(value: MetadataValue): boolean {
    if (hasValue(this.urlRegex)) {
      const pattern = new RegExp(this.urlRegex);
      return pattern.test(value.value);
    }
    return false;
  }

  /**
   * Return a queryparams object for use in a link, with the key dependent on whether this browse
   * definition is metadata browse, or item browse
   * @param value the specific metadata value being linked
   */
  getQueryParams(value) {
    let queryParams = {startsWith: value};
    if (this.browseDefinition.getRenderType() === VALUE_LIST_BROWSE_DEFINITION.value) {
      return {value: value};
    }
    return queryParams;
  }

      // kware edit
      ngOnInit(): void {

      //   this.mdValues=this.mdValues.filter( mdValue=>{return mdValue.language && mdValue.language === this.localeService.getCurrentLanguageCode()});
      // console.log(this.mdValues);
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
  
        this.link = this.label?.split('.')[2];
       if (this.link === 'type') {this.link = 'itemtype';}
       // if(this.link === 'date') this.link="issued";
  
       if (this.link === 'date' || this.link === 'issuedate') {this.link = 'issued';}
  
        if (this.link === 'authoralternative') {this.link = 'author';}
  
       if (this.link === 'advisoralternative') {this.link = 'advisor';}
  
         this.check = this.link === 'abstract' || this.link === 'citation' || this.link === 'description' || this.link === 'biography' || this.link === 'isbn' || this.link === 'ddc' || this.link === 'papersnumber' || this.link === 'report' || this.link === 'budget'  || this.link === 'acronym' || this.link === 'ownershipFundingInfo' 
          || this.link === 'linesnumber' || this.link === 'dimensions' || this.link === 'introduction' || this.link === 'conclusion'  || this.link === 'note'  || this.link === 'tableofcontents'
          || this.link === 'usagerestrictions' || this.link === 'maintenance' || this.link === 'usagerestrictions' || this.link === 'isrelated' || this.link === 'statementofresponsibility' || this.link === 'isversionof'  || this.link === 'jobTitleDescription'  || this.link === 'about' || this.link === 'issuedhijri' || this.link === 'title' || this.link === 'name' || this.link === 'telephone' || this.link ==='openingHoursSpecification' ||this.link ==='address' || this.link === 'organizationFoundingDate' || this.link === 'journal-issn' || this.link === 'issn' || this.link ===  'use' ||
           this.link === 'volume' || this.link === 'number' || this.link === 'journal-title' || this.link === 'birthDateHijri' || this.link === 'deathDateHijri' || this.link === 'dc.relation.pageNumber' ? false : true;
  
          this.externalLinks = this.link === 'facebook' || this.link === 'twitter' || this.link === 'profile' || this.link === 'wikipedia' || this.link === 'email' || this.link === 'reportUri' || this.link === 'youtube' || this.link === 'website' || this.link === 'instagram' ? true : false;
  
          
      }
      
  
       // kware edit end
}
