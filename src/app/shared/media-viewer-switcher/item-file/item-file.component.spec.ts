import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFileComponent } from './item-file.component';

describe('ItemFileComponent', () => {
  let component: ItemFileComponent;
  let fixture: ComponentFixture<ItemFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
