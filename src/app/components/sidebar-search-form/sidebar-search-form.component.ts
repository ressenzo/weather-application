import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CitiesBusiness } from '../../business/cities.business';

@Component({
  selector: 'app-sidebar-search-form',
  templateUrl: './sidebar-search-form.component.html'
})
export class SidebarSearchFormComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private citiesBusiness: CitiesBusiness) {}
  
  ngOnInit(): void {
    
    this.createForm();
  }

  createForm() {
    
    this.searchForm = this.formBuilder.group({
      cityName: ['', Validators.required]
    });
  }

  searchCity() {

    const cityName = this.searchForm.controls['cityName'].value as string;

    this.citiesBusiness.getCityWeatherByName(cityName);
  }
}
