import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { selectedCountriesData } from 'src/app/data/country-list/selected-countries';
import { AuthService } from 'src/app/api/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';  


@Component({
  selector: 'app-admin-competition-result',
  templateUrl: './admin-competition-result.component.html',
  styleUrls: ['./admin-competition-result.component.scss']
})
export class AdminCompetitionResultComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  viewsForm: FormGroup;
  viewsData: any;
  public countriesData: any[] = selectedCountriesData;
  selectedCountry: any;
  loading: boolean;
  dtData : any = [];
  show: boolean;
  selectedRecord: any;

  constructor(private formBuilder: FormBuilder,private authProvider: AuthService,public snackBar: MatSnackBar,) {
    this.viewsForm = this.formBuilder.group({
      userGroup: [this.viewsData ? this.viewsData.userGroup : null, Validators.nullValidator],
      dateAdded: [this.viewsData ? this.viewsData.dateAdded : null, Validators.nullValidator]
    });
    this.viewsForm.get('userGroup').setValue("");
    this.viewsForm.get('dateAdded').setValue("");
   }

    ngOnInit() {
    }

    public OnSearch(){
      this.loading = true;
      this.authProvider.result(this.viewsForm.value).subscribe((data) => {
          this.loading = false;
          this.dtData = data;
          this.snackBar.open('Search completed', 'CLOSE', { duration: 5000 });
        });
    }

    public View(item:any){
      this.show = true;
      this.selectedRecord = item;
    }

    public Back(){
      this.show = false;
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
