import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraerFichaComponent } from './traer-ficha.component';

describe('TraerFichaComponent', () => {
  let component: TraerFichaComponent;
  let fixture: ComponentFixture<TraerFichaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraerFichaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraerFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
