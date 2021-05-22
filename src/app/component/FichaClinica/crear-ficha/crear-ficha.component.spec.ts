import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFichaComponent } from './crear-ficha.component';

describe('CrearFichaComponent', () => {
  let component: CrearFichaComponent;
  let fixture: ComponentFixture<CrearFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
