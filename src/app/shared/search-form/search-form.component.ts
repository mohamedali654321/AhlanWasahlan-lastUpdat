import { query } from '@angular/animations';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { DSpaceObject } from '../../core/shared/dspace-object.model';
import { Router } from '@angular/router';
import { isNotEmpty } from '../empty.util';
import { SearchService } from '../../core/shared/search/search.service';
import { currentPath } from '../utils/route.utils';
import { PaginationService } from '../../core/pagination/pagination.service';
import { SearchConfigurationService } from '../../core/shared/search/search-configuration.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScopeSelectorModalComponent } from './scope-selector-modal/scope-selector-modal.component';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { DSpaceObjectDataService } from '../../core/data/dspace-object-data.service';
import { getFirstSucceededRemoteDataPayload } from '../../core/shared/operators';
import { DSONameService } from '../../core/breadcrumbs/dso-name.service';

@Component({
  selector: 'ds-search-form',
  styleUrls: ['./search-form.component.scss'],
  templateUrl: './search-form.component.html'
})
/**
 * Component that represents the search form
 */
export class SearchFormComponent implements OnChanges {
  /**
   * The search query
   */
  @Input() query = '';

  /**
   * True when the search component should show results on the current page
   */
  @Input() inPlaceSearch: boolean;

  /**
   * The currently selected scope object's UUID
   */
  @Input()
  scope = '';

  selectedScope: BehaviorSubject<DSpaceObject> = new BehaviorSubject<DSpaceObject>(undefined);

  @Input() currentUrl: string;

  /**
   * Whether or not the search button should be displayed large
   */
  @Input() large = false;

  /**
   * The brand color of the search button
   */
  @Input() brandColor = 'primary';

  /**
   * The placeholder of the search input
   */
  @Input() searchPlaceholder: string;

  /**
   * Defines whether or not to show the scope selector
   */
  @Input() showScopeSelector = false;

  /**
   * Output the search data on submit
   */
  @Output() submitSearch = new EventEmitter<any>();

  /** kware start edit */
  selectedFilter = '';

  queryFilters: any[] = [
    {
      label: 'query.filter.all',
      value: ''
    },
    {
      label: 'query.filter.title',
      value: 'dc.title'
    },
    {
      label: 'query.filter.author',
      value: 'dc.contributor.author'
    },
    {
      label: 'query.filter.publisher',
      value: 'dc.publisher'
    },
    {
      label: 'query.filter.subject',
      value: 'dc.subject'
    },
  ];
  /** kware end edit */

  constructor(
    protected router: Router,
    protected searchService: SearchService,
    protected paginationService: PaginationService,
    protected searchConfig: SearchConfigurationService,
    protected modalService: NgbModal,
    protected dsoService: DSpaceObjectDataService,
    public dsoNameService: DSONameService,
  ) {
  }

  /**
   * Retrieve the scope object from the URL so we can show its name
   */
  ngOnChanges(): void {
    if (isNotEmpty(this.scope)) {
      this.dsoService.findById(this.scope).pipe(getFirstSucceededRemoteDataPayload())
        .subscribe((scope: DSpaceObject) => this.selectedScope.next(scope));
    }
    const tempQuery = this.query.includes(':') ? this.query.split(':') : this.query;
    if (typeof tempQuery !== 'string') {
      this.query = tempQuery[1];
      this.selectedFilter = tempQuery[0];
    }
  }

  /**
   * Updates the search when the form is submitted
   * @param data Values submitted using the form
   */
  onSubmit(data: any) {
    let filteredQuery = { query: `${data.queryFilter !== '' ? `${data.queryFilter}:` : ''}${this.query || '*'}` };
    if (isNotEmpty(this.scope)) {
      filteredQuery = Object.assign(filteredQuery, { scope: this.scope });
    }
    this.updateSearch(filteredQuery);
    this.submitSearch.emit(filteredQuery);
  }

  /**
   * Updates the search when the current scope has been changed
   * @param {string} scope The new scope
   */
  onScopeChange(scope: DSpaceObject) {
    this.updateSearch({ scope: scope ? scope.uuid : undefined });
  }

  /**
   * Updates the search URL
   * @param data Updated parameters
   */
  updateSearch(data: any) {
    const queryParams = Object.assign({}, data);

    void this.router.navigate(this.getSearchLinkParts(), {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  /**
   * @returns {string} The base path to the search page, or the current page when inPlaceSearch is true
   */
  public getSearchLink(): string {
    if (this.inPlaceSearch) {
      return currentPath(this.router);
    }
    return this.searchService.getSearchLink();
  }

  /**
   * @returns {string[]} The base path to the search page, or the current page when inPlaceSearch is true, split in separate pieces
   */
  public getSearchLinkParts(): string[] {
    if (this.inPlaceSearch) {
      return [];
    }
    return this.getSearchLink().split('/');
  }

  /**
   * Open the scope modal so the user can select DSO as scope
   */
  openScopeModal() {
    const ref = this.modalService.open(ScopeSelectorModalComponent);
    ref.componentInstance.scopeChange.pipe(take(1)).subscribe((scope: DSpaceObject) => {
      this.selectedScope.next(scope);
      this.onScopeChange(scope);
    });
  }
}
