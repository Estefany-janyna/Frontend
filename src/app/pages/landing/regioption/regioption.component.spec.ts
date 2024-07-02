import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioptionComponent } from './regioption.component';

describe('RegioptionComponent', () => {
  let component: RegioptionComponent;
  let fixture: ComponentFixture<RegioptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegioptionComponent]
    });
    fixture = TestBed.createComponent(RegioptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
