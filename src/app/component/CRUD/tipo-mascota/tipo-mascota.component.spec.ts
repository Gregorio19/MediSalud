import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMascotaComponent } from './tipo-mascota.component';

describe('TipoMascotaComponent', () => {
  let component: TipoMascotaComponent;
  let fixture: ComponentFixture<TipoMascotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMascotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
