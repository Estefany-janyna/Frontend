import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicionariomoduleComponent } from './dicionariomodule.component';

describe('DicionariomoduleComponent', () => {
  let component: DicionariomoduleComponent;
  let fixture: ComponentFixture<DicionariomoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DicionariomoduleComponent]
    });
    fixture = TestBed.createComponent(DicionariomoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
