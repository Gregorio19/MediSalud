import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCitaComponent } from './adm-cita.component';

describe('AdmCitaComponent', () => {
  let component: AdmCitaComponent;
  let fixture: ComponentFixture<AdmCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
