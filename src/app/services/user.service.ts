import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interfaces';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  /**
   * *Get user data with pagination
   *
   * @return {Observable<User[]>}
   */
  getUSers({
    skip = 0,
    limit = 0,
    search = '',
  }): Observable<{ data: User[]; total: number }> {
    skip = limit * skip;
    let params = { offset: skip, limit, search };

    return this.http.get(`${environment.API}/users`, { params }).pipe(
      map((resp) => {
        return <{ data: User[]; total: number }>resp;
      }),
      catchError((err) => {
        this.toastr.error(`Error de servicio`);
        return throwError(err);
      })
    );
  }

  /**
   * *Register user in database
   *
   * @return {Observable<User>}
   */
  registerUser(user: User): Observable<{ data: User }> {
    return this.http.post(`${environment.API}/user`, user).pipe(
      map((resp: any) => {
        this.toastr.success(resp.message);
        return <{ data: User }>resp;
      }),
      catchError((err) => {
        this.toastr.error(`Error de servicio`);
        return throwError(err);
      })
    );
  }

  /**
   * *Update user in database
   *
   * @return {Observable<User>}
   */
  updateUser(user: User): Observable<{ data: User }> {
    return this.http.put(`${environment.API}/user`, user).pipe(
      map((resp: any) => {
        this.toastr.success(resp.message);
        return <{ data: User }>resp;
      }),
      catchError((err) => {
        this.toastr.error(`Error de servicio`);
        return throwError(err);
      })
    );
  }

  /**
   * *Delete user in database
   *
   * @return {Observable<User>}
   */
  deleteUser(user: User): Observable<{ data: User }> {
    return this.http.delete(`${environment.API}/user`, { body: user }).pipe(
      map((resp: any) => {
        this.toastr.success(resp.message);
        return <{ data: User }>resp;
      }),
      catchError((err) => {
        this.toastr.error(`Error de servicio`);
        return throwError(err);
      })
    );
  }
}
