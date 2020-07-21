import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './api/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT, Location, NgLocalization } from '@angular/common';
import { ConfirmDialogService } from './providers/modals/confirm-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'competition';
  toggleMenu: boolean = false;

  loggedInUser: any;
  loadingUser: boolean;
  emailVerified: boolean;
  isArtist: boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    public authData: AuthService,
    private router: Router,
    private route:ActivatedRoute,
    private confirmDialog: ConfirmDialogService,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.loadUserData();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.loadUserData();
      this.document.body.classList.remove('auth-page');
      if((event.url.indexOf('login') > -1) || (event.url.indexOf('register') > -1) || (event.url.indexOf('password-reset') > -1)) {
        if(event.url.indexOf('login') > -1 || (event.url.indexOf('password-reset') > -1)) {
          this.document.body.classList.add('login-page');
          // this.loggedInUser = null;
        }
        else {
          this.document.body.classList.remove('login-page');
        }
        this.document.body.classList.add('auth-page');
      }
      else {
        this.document.body.classList.remove('auth-page');
        this.document.body.classList.remove('login-page');
      }
    });
  }

  ngOnInit() {

  }

  loadUserData() {
    this.authData.currentUser().subscribe((data) => {
      this.loadingUser = true;
      if(data.length) {
        // this.emailVerified = data.emailVerified;
        this.loggedInUser = data[0];
        //this.loggedInUser.firstName = data[0].userType === 'JUDGE' ? 'JUDGE' :  data[0].firstName; 
        this.loggedInUser.firstName = data[0].firstName; 
        this.loggedInUser.lastName = data[0].lastName; 
        this.loggedInUser.userType = data[0].userType; 

        this.isArtist = this.loggedInUser.userType == 'ARTIST' || this.loggedInUser.userType == null;
        
        //Don't re-rout if urls are like below ones
        if(this.router.url == '/submission/comments' || this.router.url == '/submission/complete' || this.router.url == '/submission/approved')
          return;

        if(data[0].userType === 'ADMINISTRATOR'){
          this.router.navigate(['/admin'] );
          return;
        }
        
        this.router.navigate(data[0].userType === 'JUDGE' ? ['/submissions'] : ['/profile'] );
        this.loadingUser = false;
        if(!data) {
         this.router.navigate(['/login']);
          this.loggedInUser = null;
          this.loadingUser = false;
        }
      }
      else {
      //  this.router.navigate(['/login']);
        this.loggedInUser = null;
        this.loadingUser = false;
      }
    });
  }
y
  logout() {

    if(this.loggedInUser.userType == "JUDGE")
      this.confirmDialog.openConfirmDialog('Logout', 'logout', "testtest").subscribe(res => {
        if(res) {
          out(this);
        }
      });
    else
      out(this);

    function out(curr){
      curr.toggleMenu = false;
      curr.authData.logoutUser()
      curr.loggedInUser = null;
      curr.router.navigate(['/login']);
      curr.loadUserData();
      curr.snackBar.open('You have been logged out', 'CLOSE', {
          duration: 5000,
        });
    }
  }
}
