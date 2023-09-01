import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewerSwitcherComponent } from './media-viewer-switcher.component';

describe('MediaViewerSwitcherComponent', () => {
  let component: MediaViewerSwitcherComponent;
  let fixture: ComponentFixture<MediaViewerSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaViewerSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaViewerSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
