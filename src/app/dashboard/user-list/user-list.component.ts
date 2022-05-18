import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserDialogeComponent } from 'src/app/dashboard/add-edit-user-dialoge/add-edit-user-dialoge.component';
import { DeleteUserDialogComponent } from 'src/app/dashboard/delete-user-dialog/delete-user-dialog.component';
import { UserDetails } from 'src/app/models/users.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() userList!: UserDetails[];
  isAdmin: string | null;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  editUserDialog(user: UserDetails) {
    const dialogRef = this.dialog.open(AddEditUserDialogeComponent, {
      width: '550px',
      height: 'auto',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result: UserDetails) => {
      this.dashboardService.updateUser(result).subscribe(() => {
        this.userList.map((element: UserDetails) => {
          if (element.id === result.id) {
            element.name = result.name;
            element.position = result.position;
            element.department = result.department;
          }
        });
      });
    });
  }

  deleteuser(user: UserDetails) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '550px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result: UserDetails | string) => {
      if (result === 'delete') {
        this.dashboardService.deleteUser(user.id).subscribe(() => {
          this.getUserDetails();
        });
      }
    });
  }
  getUserDetails() {
    this.dashboardService.getUserLists().subscribe((result: UserDetails[]) => {
      this.userList = result;
    });
  }
}
