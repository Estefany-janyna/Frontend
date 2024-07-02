import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLeccionComponent } from './listar-leccion.component';

describe('ListarLeccionComponent', () => {
  let component: ListarLeccionComponent;
  let fixture: ComponentFixture<ListarLeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarLeccionComponent]
    });
    fixture = TestBed.createComponent(ListarLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
