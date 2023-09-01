import { TestBed } from '@angular/core/testing';

import { VirtualMetadataFieldsService } from './virtual-metadata-fields.service';

describe('VirtualMetadataFieldsService', () => {
  let service: VirtualMetadataFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualMetadataFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
