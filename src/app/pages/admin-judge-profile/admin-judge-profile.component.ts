import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-judge-profile',
  templateUrl: './admin-judge-profile.component.html',
  styleUrls: ['./admin-judge-profile.component.scss']
})
export class AdminJudgeProfileComponent implements OnInit {

   @Input() userRecord:any;
   profileImage : any;
  updatingGroup: boolean;
  updatingRole: boolean;
  constructor(private authProvider: AuthService,public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.profileImage = this.userRecord.imageUrl || "http://placehold.it/380x500";
  }

  UpdateGroup(group:any){
    this.userRecord.userGroup = group;
    this.updatingGroup = true;
    this.UpdateUser();
  }

  UpdateRole(role:any){
    this.userRecord.userType = role;
    this.updatingRole = true;
    this.UpdateUser()
  }

  UpdateUser(){

    this.authProvider.updateUser(this.userRecord).subscribe((data) => {
      this.updatingGroup = false;
      this.updatingRole = false;
      if(data["code"] == 1054) //if colom nt exist
        delete(this.userRecord.userGroup)
        
      this.snackBar.open(data['message'], 'CLOSE', { duration: 5000 });
      
    });
  }

}
