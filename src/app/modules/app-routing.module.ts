import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { SubmissionComponent } from '../pages/submission/submission.component';
import { PasswordResetComponent } from '../pages/auth/password-reset/password-reset.component';
import {SubmissionReviewComponent} from '../pages/submission-review/submission-review.component';
import {SubmissionReviewCompletedComponent} from '../pages/submission-review-completed/submission-review-completed.component';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';
import { SubmissionApprovedComponent } from '../pages/submission-approved/submission-approved.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'submissions',
    component: SubmissionComponent
  },
  {
    path: 'submission/comments',
    component: SubmissionReviewComponent
  },
  {
    path: 'submission/complete',
    component: SubmissionReviewCompletedComponent
  },
  {
    path: 'submission/approved',
    component: SubmissionApprovedComponent
  },
  {
    path: 'password-reset/:email',
    component: PasswordResetComponent
  },
  {
    path :'admin',
    component: AdminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
