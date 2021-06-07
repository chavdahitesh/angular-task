import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderUsingBootstrapComponent } from './reminder-using-bootstrap.component';

describe('ReminderUsingBootstrapComponent', () => {
  let component: ReminderUsingBootstrapComponent;
  let fixture: ComponentFixture<ReminderUsingBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderUsingBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderUsingBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
