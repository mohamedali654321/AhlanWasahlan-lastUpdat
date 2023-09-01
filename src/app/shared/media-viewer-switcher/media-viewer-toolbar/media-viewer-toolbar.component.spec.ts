import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaViewerToolbarComponent } from './media-viewer-toolbar.component';

describe('MediaViewerToolbarComponent', () => {
  let component: MediaViewerToolbarComponent;
  let fixture: ComponentFixture<MediaViewerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaViewerToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaViewerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
