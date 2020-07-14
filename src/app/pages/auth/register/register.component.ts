import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/api/auth/auth.service';
import { Router } from '@angular/router';
import { Country } from '@angular-material-extensions/select-country';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { selectedCountriesData } from 'src/app/data/country-list/selected-countries';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean = false;
  form: FormGroup;
  submitted: boolean;
  public countriesData: any[] = selectedCountriesData;
  
  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      cellNumber: ['', Validators.required],
      terms: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nationality: ['', Validators.nullValidator],
      dateAdded: [(new Date()).toLocaleDateString(), Validators.nullValidator],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })

    this.form.get('nationality').setValue("");
  }

  ngOnInit() {
  }

  onCountrySelected($event: Country) {
    // console.log($event);
  }

  get registerForm() { return this.form.controls; }

  registerUser() {
    this.submitted = true;
    console.log(this.form.controls);
    if (this.form.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    this.form.value.userGroup = this.GetGroup(this.form.value.nationality)
    this.authService.signupUser(this.form.value)
    .subscribe(authData => {
      console.log(authData);
      if(authData['code'] !== 200) {
        this.snackBar.open(authData['message'], 'CLOSE', { duration: 5000 });
      }
      else {
        this.router.navigate(['/profile']);
      }
      this.loading = false;
    }, error => {
      console.log(error);
      this.snackBar.open(error.message, 'CLOSE', { duration: 5000 });
      this.loading = false;
    });
    }

    GetGroup(nationality){
      return selectedCountriesData.filter(c=>c.name_official == nationality)[0].group;
    }

}
