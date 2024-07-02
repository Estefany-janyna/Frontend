import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeccionComponent } from './student-leccion.component';

describe('StudentLeccionComponent', () => {
  let component: StudentLeccionComponent;
  let fixture: ComponentFixture<StudentLeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLeccionComponent]
    });
    fixture = TestBed.createComponent(StudentLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
