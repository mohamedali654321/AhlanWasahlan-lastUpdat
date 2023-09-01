import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFilesSectionComponent } from './item-files-section.component';

describe('ItemFilesSectionComponent', () => {
  let component: ItemFilesSectionComponent;
  let fixture: ComponentFixture<ItemFilesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFilesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFilesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
