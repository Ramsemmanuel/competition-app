import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


export interface PasswordResetModel {
  email?: string,
  // token?: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersDB: AngularFirestoreCollection<any> = this.afs.collection('users');
  uuid = UUID.UUID();
  API_URL: 'http://localhost:3000';
//API_URL: 'http://sightgroupsa.co.za'
  private emailUrl = 'http://www.sightgroupsa.co.za/email/reset-password.php';
 // private entrySubmissionEmailUrl = 'http://www.sightgroupsa.co.za/entrysubmissionmails.php';

 private entrySubmissionEmailUrl = 'http://www.sightgroupsa.co.za/email/submissionentry.php';

  constructor(
    public afAuth: AngularFireAuth,
    public afd: AngularFireDatabase,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  loginUser(newEmail: string, newPassword: string) {
    return this.httpClient.post(`http://localhost:3000/login`, {email: newEmail, password: newPassword}).subscribe((data) => {
      let userData = data;
      if(data['code'] === 200) {
        sessionStorage.setItem('competition:uuid', data['data'].id);
        this.router.navigate(data['data'].userType === 'JUDGE' ? ['/submissions'] : ['/profile'] );
        this.snackBar.open('Logged in successfully', 'CLOSE', { duration: 2000 });
      }
      else {
        this.snackBar.open(data['success'], 'CLOSE', { duration: 5000 });
      }
    })
  }

  getAllUsers() {
    return this.httpClient.get('http://localhost:3000/users/');
  }

  getLoggedInUser() {
    let userId = sessionStorage.getItem('competition:uuid');
    return this.httpClient.post(`http://localhost:3000/get-user`, {id: userId});
  }

  getUserByEmail(data) {
    return this.httpClient.post(`http://localhost:3000/get-user-by-email`, {email: data});
  }


  updateUser(userData) {
    return this.httpClient.put(`http://localhost:3000/update-user`, userData)
  }

  searchUser(criteria, isArtist) {
    if(isArtist)
      return this.httpClient.post(`http://localhost:3000/artistsearch`,criteria);
    return this.httpClient.post(`http://localhost:3000/usersearch`,criteria);
  }

  searchCompetitorUsers(criteria) {
    return this.httpClient.post(`http://localhost:3000/competitorsearch`,criteria);
  }

  result(criteria) {
    return this.httpClient.post(`http://localhost:3000/result`,criteria);
  }

  logoutUser() {
    sessionStorage.removeItem('competition:notice');
    return sessionStorage.removeItem('competition:uuid');
  }

  signupUser(userData) {
    let data = userData;
    data.id = this.uuid;
    data.imageUrl = '';
    data.idDocument = '',
    delete data.terms;
    delete data.confirmPassword;
    sessionStorage.setItem('competition:uuid', data.id);
    return this.httpClient.post(`http://localhost:3000/create-user`, userData)
  }

  sendEmailForPasswordReset(message: PasswordResetModel): Observable<PasswordResetModel> | any {
    let mailObj = { email: message }
      return this.httpClient.post(this.emailUrl, mailObj, {responseType: 'text'})
      .pipe(
        map(response => {
          console.log('Sending email was successfull',response);
          return response;
        }),
        catchError(error => {
          console.log('Sending email got error', error);
          return throwError(error)
        })
      );
  }

  sendEmailForEntrySubmission(message: PasswordResetModel): Observable<PasswordResetModel> | any {
    console.log('Send email for entry submission : sending email started...');
    let mailObj = { email: message }
      return this.httpClient.post(this.entrySubmissionEmailUrl, mailObj, {responseType: 'text'})
      .pipe(
        map(response => {
          console.log('Send email for entry submission : sending email was successfull',response);
          return response;
        }),
        catchError(error => {
          console.log('Send email for entry submission : sending email got error', error);
          return throwError(error)
        })
      );
  }

  resetPassword(userData) {
    return this.httpClient.put(`http://localhost:3000/update-user`, userData)
  }

  currentUser(): any {
    return this.getLoggedInUser()
  }
}
