import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditUserDialogeComponent } from 'src/app/dashboard/add-edit-user-dialoge/add-edit-user-dialoge.component';
import { UserDetails } from 'src/app/models/users.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAdmin = localStorage.getItem('isAdmin');
  userList!: UserDetails[];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.dashboardService.getUserLists().subscribe((result: UserDetails[]) => {
      this.userList = result;
    });
  }

  addUserDialog() {
    const dialogRef = this.dialog.open(AddEditUserDialogeComponent, {
      width: '550px',
      height: 'auto',
      data: 'add',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.name !== '' && result.name !== null) {
        this.dashboardService.addUser(result).subscribe((res) => {
          if (res) {
            this.getUserList();
          }
        });
      }
    });
  }

  logOut() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
}
