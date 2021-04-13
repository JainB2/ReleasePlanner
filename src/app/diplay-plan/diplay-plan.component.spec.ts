import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayPlanComponent } from './diplay-plan.component';

describe('DiplayPlanComponent', () => {
  let component: DiplayPlanComponent;
  let fixture: ComponentFixture<DiplayPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplayPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplayPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
