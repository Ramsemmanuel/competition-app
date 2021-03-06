import { Injectable } from '@angular/core';
import { ConfirmDeleteDialogComponent } from 'src/app/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ConfirmLogoutDialogComponent } from 'src/app/components/confirm-logout-dialog/confirm-logout-dialog.component';
import { SubmissionCompletedDialogComponent } from 'src/app/components/submission-completed-dialog/submission-completed-dialog.component'
import { MatDialog } from '@angular/material';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  dialogRef: any;
  constructor(public dialog: MatDialog) { }

  openDialog(action, type, data) {
    if(type=='logout')
      return this.dialog.open(ConfirmLogoutDialogComponent, {
        width: '500px',
        data: { name: data.description, type: type, action: action }
      });

    if(type=='reviewcomplete')
      return this.dialog.open(SubmissionCompletedDialogComponent, {
        width: '500px',
        data: { name: data.description, type: type, action: action }
      });
      
    return this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: { name: data.description, type: type, action: action }
    });
  }

  openConfirmDialog(action, type, data) {
    this.dialogRef = this.openDialog(action, type, data);

    return this.dialogRef.afterClosed()
  }
}
