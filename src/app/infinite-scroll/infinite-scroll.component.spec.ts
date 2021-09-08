import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InifinteScrollComponent } from './infinite-scroll.component';

describe('InifinteScrollComponent', () => {
  let component: InifinteScrollComponent;
  let fixture: ComponentFixture<InifinteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InifinteScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InifinteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
