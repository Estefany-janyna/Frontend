import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLeccionStudentComponent } from './listar-leccion-student.component';

describe('ListarLeccionStudentComponent', () => {
  let component: ListarLeccionStudentComponent;
  let fixture: ComponentFixture<ListarLeccionStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarLeccionStudentComponent]
    });
    fixture = TestBed.createComponent(ListarLeccionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
