import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CscService } from './csc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  createAccountForm: FormGroup;
  countries: Array<any>;
  states: {};
  cities: {};

  constructor(private cscService: CscService) { }

  ngOnInit() {
 
   
    this.cscService.getCountries()
    .subscribe( data => {
      this.countries = data
    });


    console.log(this.countries);
    this.createAccountForm = new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    });
    alert(this.countries);
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.cscService.getStates(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }
}
