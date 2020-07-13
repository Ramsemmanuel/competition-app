import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  editing: boolean;

  constructor() { }

  displayComponent: string ="DASHBOARD";

  ngOnInit() {
  }

  public Action(action:string, e:any){
    this.displayComponent = action;

  }
  

}
