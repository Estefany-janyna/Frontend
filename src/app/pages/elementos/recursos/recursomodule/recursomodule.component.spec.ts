import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursomoduleComponent } from './recursomodule.component';

describe('RecursomoduleComponent', () => {
  let component: RecursomoduleComponent;
  let fixture: ComponentFixture<RecursomoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursomoduleComponent]
    });
    fixture = TestBed.createComponent(RecursomoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
