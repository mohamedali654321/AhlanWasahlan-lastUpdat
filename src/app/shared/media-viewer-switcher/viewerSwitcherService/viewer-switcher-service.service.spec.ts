import { TestBed } from '@angular/core/testing';

import { ViewerSwitcherService } from './viewer-switcher-service.service';

describe('ViewerSwitcherService', () => {
  let service: ViewerSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewerSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
