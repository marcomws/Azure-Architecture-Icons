import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsBlockComponent } from './icons-block.component';

describe('IconsBlockComponent', () => {
  let component: IconsBlockComponent;
  let fixture: ComponentFixture<IconsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
