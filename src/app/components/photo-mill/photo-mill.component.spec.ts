import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoMillComponent } from './photo-mill.component';

describe('PhotoMillComponent', () => {
  let component: PhotoMillComponent;
  let fixture: ComponentFixture<PhotoMillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoMillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoMillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
