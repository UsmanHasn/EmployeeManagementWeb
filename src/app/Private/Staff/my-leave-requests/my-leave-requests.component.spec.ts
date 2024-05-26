import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaveRequestsComponent } from './my-leave-requests.component';

describe('MyLeaveRequestsComponent', () => {
  let component: MyLeaveRequestsComponent;
  let fixture: ComponentFixture<MyLeaveRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyLeaveRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
