import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: 'delete-user-dialog.component.html',
  styleUrls: ['delete-user-dialog.component.scss'],
})
export class DeleteUserDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>) {}

  deleteUser() {
    this.dialogRef.close('delete');
  }

  cancel() {
    this.dialogRef.close();
  }
}
