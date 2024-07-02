import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarResultadosComponent } from './revisar-resultados.component';

describe('RevisarResultadosComponent', () => {
  let component: RevisarResultadosComponent;
  let fixture: ComponentFixture<RevisarResultadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisarResultadosComponent]
    });
    fixture = TestBed.createComponent(RevisarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
