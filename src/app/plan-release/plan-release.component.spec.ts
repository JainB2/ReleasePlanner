import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReleaseComponent } from './plan-release.component';

describe('PlanReleaseComponent', () => {
  let component: PlanReleaseComponent;
  let fixture: ComponentFixture<PlanReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
