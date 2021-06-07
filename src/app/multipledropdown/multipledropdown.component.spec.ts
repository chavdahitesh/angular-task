import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipledropdownComponent } from './multipledropdown.component';

describe('MultipledropdownComponent', () => {
  let component: MultipledropdownComponent;
  let fixture: ComponentFixture<MultipledropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipledropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipledropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
