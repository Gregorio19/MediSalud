import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtnerCitaComponent } from './obtner-cita.component';

describe('ObtnerCitaComponent', () => {
  let component: ObtnerCitaComponent;
  let fixture: ComponentFixture<ObtnerCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtnerCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtnerCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
