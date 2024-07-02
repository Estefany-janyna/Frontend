import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLeccionComponent } from './crear-leccion.component';

describe('CrearLeccionComponent', () => {
  let component: CrearLeccionComponent;
  let fixture: ComponentFixture<CrearLeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearLeccionComponent]
    });
    fixture = TestBed.createComponent(CrearLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
