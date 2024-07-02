import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiccionarioCrudComponent } from './diccionario-crud.component';

describe('DiccionarioCrudComponent', () => {
  let component: DiccionarioCrudComponent;
  let fixture: ComponentFixture<DiccionarioCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiccionarioCrudComponent]
    });
    fixture = TestBed.createComponent(DiccionarioCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
