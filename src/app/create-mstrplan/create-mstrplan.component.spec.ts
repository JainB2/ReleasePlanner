import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMstrplanComponent } from './create-mstrplan.component';


describe('CreateMstrplanComponent', () => {
  let component: CreateMstrplanComponent;
  let fixture: ComponentFixture<CreateMstrplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMstrplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMstrplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
