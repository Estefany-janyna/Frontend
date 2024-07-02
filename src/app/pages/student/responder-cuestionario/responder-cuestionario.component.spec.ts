import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderCuestionarioComponent } from './responder-cuestionario.component';

describe('ResponderCuestionarioComponent', () => {
  let component: ResponderCuestionarioComponent;
  let fixture: ComponentFixture<ResponderCuestionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponderCuestionarioComponent]
    });
    fixture = TestBed.createComponent(ResponderCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
