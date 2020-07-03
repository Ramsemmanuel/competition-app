import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-submission-completed-dialog',
  templateUrl: './submission-completed-dialog.component.html',
  styleUrls: ['./submission-completed-dialog.component.scss']
})
export class SubmissionCompletedDialogComponent implements OnInit {

  competitionTypes: any;
  constructor(
    public dialogRef: MatDialogRef<SubmissionCompletedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    
    onCancel(): void {
      this.dialogRef.close(false);
    }

    onConfirm(): void {
      this.dialogRef.close(true);
    }

    ngOnInit() {
    }

}
