import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoInfoComponent } from './recurso-info.component';

describe('RecursoInfoComponent', () => {
  let component: RecursoInfoComponent;
  let fixture: ComponentFixture<RecursoInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursoInfoComponent]
    });
    fixture = TestBed.createComponent(RecursoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
