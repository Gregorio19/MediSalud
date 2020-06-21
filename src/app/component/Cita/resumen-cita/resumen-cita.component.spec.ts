import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCitaComponent } from './resumen-cita.component';

describe('ResumenCitaComponent', () => {
  let component: ResumenCitaComponent;
  let fixture: ComponentFixture<ResumenCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
