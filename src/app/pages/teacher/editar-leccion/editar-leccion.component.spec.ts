import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLeccionComponent } from './editar-leccion.component';

describe('EditarLeccionComponent', () => {
  let component: EditarLeccionComponent;
  let fixture: ComponentFixture<EditarLeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarLeccionComponent]
    });
    fixture = TestBed.createComponent(EditarLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
