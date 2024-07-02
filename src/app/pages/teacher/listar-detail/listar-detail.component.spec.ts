import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetailComponent } from './listar-detail.component';

describe('ListarDetailComponent', () => {
  let component: ListarDetailComponent;
  let fixture: ComponentFixture<ListarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDetailComponent]
    });
    fixture = TestBed.createComponent(ListarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
