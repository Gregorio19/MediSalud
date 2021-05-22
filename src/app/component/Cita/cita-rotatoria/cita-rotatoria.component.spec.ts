import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaRotatoriaComponent } from './cita-rotatoria.component';

describe('CitaRotatoriaComponent', () => {
  let component: CitaRotatoriaComponent;
  let fixture: ComponentFixture<CitaRotatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaRotatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaRotatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
