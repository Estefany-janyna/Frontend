import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiccionarioDetailComponent } from './diccionario-detail.component';

describe('DiccionarioDetailComponent', () => {
  let component: DiccionarioDetailComponent;
  let fixture: ComponentFixture<DiccionarioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiccionarioDetailComponent]
    });
    fixture = TestBed.createComponent(DiccionarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
