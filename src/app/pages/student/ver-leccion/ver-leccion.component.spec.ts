import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLeccionComponent } from './ver-leccion.component';

describe('VerLeccionComponent', () => {
  let component: VerLeccionComponent;
  let fixture: ComponentFixture<VerLeccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerLeccionComponent]
    });
    fixture = TestBed.createComponent(VerLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
