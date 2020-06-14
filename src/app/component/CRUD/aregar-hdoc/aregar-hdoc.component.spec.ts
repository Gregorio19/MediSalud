import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AregarHDocComponent } from './aregar-hdoc.component';

describe('AregarHDocComponent', () => {
  let component: AregarHDocComponent;
  let fixture: ComponentFixture<AregarHDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AregarHDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AregarHDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
