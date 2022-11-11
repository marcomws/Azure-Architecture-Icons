import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIconsComponent } from './view-icons.component';

describe('ViewIconsComponent', () => {
  let component: ViewIconsComponent;
  let fixture: ComponentFixture<ViewIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIconsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
