import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserDialogeComponent } from './add-edit-user-dialoge.component';

describe('AddEditUserDialogeComponent', () => {
  let component: AddEditUserDialogeComponent;
  let fixture: ComponentFixture<AddEditUserDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserDialogeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
