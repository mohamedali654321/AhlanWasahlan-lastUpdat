import { TestBed } from '@angular/core/testing';

import { GetMetadataByLanguageService } from './get-metadata-by-language.service';

describe('GetMetadataByLanguageService', () => {
  let service: GetMetadataByLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMetadataByLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
