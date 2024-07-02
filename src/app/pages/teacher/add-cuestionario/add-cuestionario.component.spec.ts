import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCuestionarioComponent } from './add-cuestionario.component';

describe('AddCuestionarioComponent', () => {
  let component: AddCuestionarioComponent;
  let fixture: ComponentFixture<AddCuestionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCuestionarioComponent]
    });
    fixture = TestBed.createComponent(AddCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
