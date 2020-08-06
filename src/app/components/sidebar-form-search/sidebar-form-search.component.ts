import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { CurrentWeatherResponse } from '../../interfaces/current-weather-response.interface';
import { CitiesBusiness } from '../../business/cities.business';
import { CityLocalStorageInterface } from '../../interfaces/city-local-storage.interface';

@Component({
  selector: 'app-sidebar-form-search',
  templateUrl: './sidebar-form-search.component.html'
})
export class SidebarFormSearchComponent implements OnInit {

  constructor() {}
  
  ngOnInit(): void {
    
  }
}
