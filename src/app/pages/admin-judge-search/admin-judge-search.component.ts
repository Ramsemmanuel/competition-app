import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { selectedCountriesData } from 'src/app/data/country-list/selected-countries';
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';  

@Component({
  selector: 'app-admin-judge-search',
  templateUrl: './admin-judge-search.component.html',
  styleUrls: ['./admin-judge-search.component.scss']
})
export class AdminJudgeSearchComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  viewsForm: FormGroup;
  viewsData: any;
  public countriesData: any[] = selectedCountriesData;
  selectedCountry: any;
  loading: boolean;
  dtData : any = [];
  editing: boolean;
  selectedRecord: any;

  constructor(private formBuilder: FormBuilder,private authProvider: AuthService,public snackBar: MatSnackBar,) {
    this.viewsForm = this.formBuilder.group({
      firstName: [this.viewsData ? this.viewsData.firstName : null, Validators.nullValidator],
      lastName: [this.viewsData ? this.viewsData.lastName : null, Validators.nullValidator],
      email: [this.viewsData ? this.viewsData.email : null, Validators.nullValidator],
      nationality: [this.viewsData ? this.viewsData.nationality : null, Validators.nullValidator],
      dateAdded: [this.viewsData ? this.viewsData.dateAdded : null, Validators.nullValidator]
    });
    this.viewsForm.get('nationality').setValue("");
    this.viewsForm.get('dateAdded').setValue("");
   }

    ngOnInit() {
    }

    public OnSearch(){
      this.loading = true;
      this.authProvider.searchUser(this.viewsForm.value).subscribe((data) => {
          this.loading = false;
          this.dtData = data;
          this.snackBar.open('Search completed', 'CLOSE', { duration: 5000 });
        });
    }

    public Edit(item:any){
      this.editing = true;
      this.selectedRecord = item;
    }

    public Back(){
      this.editing = false;
    }

    public ExportTOExcel() {  
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
      /* hide second column */
      ws['!cols'] = [];
      ws['!cols'][0] = { hidden: true };
      ws['!cols'][6] = { hidden: true };
      const wb: XLSX.WorkBook = XLSX.utils.book_new();  
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
      XLSX.writeFile(wb, 'search_result.xlsx');  
    }

}
