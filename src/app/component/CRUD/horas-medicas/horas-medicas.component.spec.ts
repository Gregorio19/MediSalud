import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasMedicasComponent } from './horas-medicas.component';

describe('HorasMedicasComponent', () => {
  let component: HorasMedicasComponent;
  let fixture: ComponentFixture<HorasMedicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasMedicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasMedicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
