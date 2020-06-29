import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAgendaComponent } from './datos-agenda.component';

describe('DatosAgendaComponent', () => {
  let component: DatosAgendaComponent;
  let fixture: ComponentFixture<DatosAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
