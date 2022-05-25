import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-user-dialoge',
  templateUrl: 'add-edit-user-dialoge.component.html',
  styleUrls: ['add-edit-user-dialoge.component.scss'],
})
export class AddEditUserDialogeComponent implements OnInit {
  title = 'Add User';
  isDisabledInput = localStorage.getItem('isAdmin');
  userForm = this.fb.group({
    id: [],
    name: [Validators.required],
    position: [Validators.required],
    department: [Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUserDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data !== 'add') {
      this.title = 'Edit User';
      this.userForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        position: this.data.position,
        department: this.data.department,
      });
    } else {
      this.userForm.reset();
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.userForm.value);
  }

  onCancel(): void {
    this.userForm.reset();
    this.dialogRef.close();
  }
}
