import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprendermoduleComponent } from './aprendermodule.component';

describe('AprendermoduleComponent', () => {
  let component: AprendermoduleComponent;
  let fixture: ComponentFixture<AprendermoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprendermoduleComponent]
    });
    fixture = TestBed.createComponent(AprendermoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
