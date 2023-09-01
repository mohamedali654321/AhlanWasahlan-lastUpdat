import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublictaionCountComponent } from './publictaion-count.component';

describe('PublictaionCountComponent', () => {
  let component: PublictaionCountComponent;
  let fixture: ComponentFixture<PublictaionCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublictaionCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublictaionCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
