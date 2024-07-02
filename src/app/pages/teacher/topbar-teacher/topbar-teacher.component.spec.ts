import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarTeacherComponent } from './topbar-teacher.component';

describe('TopbarTeacherComponent', () => {
  let component: TopbarTeacherComponent;
  let fixture: ComponentFixture<TopbarTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopbarTeacherComponent]
    });
    fixture = TestBed.createComponent(TopbarTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
