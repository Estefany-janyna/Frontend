import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioStudentComponent } from './cuestionario-student.component';

describe('CuestionarioStudentComponent', () => {
  let component: CuestionarioStudentComponent;
  let fixture: ComponentFixture<CuestionarioStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuestionarioStudentComponent]
    });
    fixture = TestBed.createComponent(CuestionarioStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
