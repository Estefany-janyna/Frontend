import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpruebaComponent } from './modalprueba.component';

describe('ModalpruebaComponent', () => {
  let component: ModalpruebaComponent;
  let fixture: ComponentFixture<ModalpruebaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalpruebaComponent]
    });
    fixture = TestBed.createComponent(ModalpruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
