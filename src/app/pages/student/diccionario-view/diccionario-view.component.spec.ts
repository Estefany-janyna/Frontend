import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiccionarioViewComponent } from './diccionario-view.component';

describe('DiccionarioViewComponent', () => {
  let component: DiccionarioViewComponent;
  let fixture: ComponentFixture<DiccionarioViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiccionarioViewComponent]
    });
    fixture = TestBed.createComponent(DiccionarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
