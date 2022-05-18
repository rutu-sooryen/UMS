import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserDetails, UsersWithRole } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  getUserList = 'userList';
  getUserRole = 'usersWithRole';
  baseUrl = environment.baseUrl;

  getUserLists(): Observable<UserDetails[]| any > {
    return this.http.get(this.baseUrl + this.getUserList);
  }

  getUserRoles(): Observable<UsersWithRole[] | any> {
    return this.http.get(this.baseUrl + this.getUserRole);
  }

  addUser(userDetails: UserDetails): Observable<UsersWithRole | Object> {
    return this.http.post(this.baseUrl + this.getUserList, userDetails);
  }

  updateUser(userDetails: UserDetails): Observable<UsersWithRole | Object> {
    return this.http.patch(
      this.baseUrl + this.getUserList + '/' + userDetails.id,
      userDetails
    );
  }

  deleteUser(userId: number): Observable<Object> {
    return this.http.delete(this.baseUrl + this.getUserList + '/' + userId);
  }
}
