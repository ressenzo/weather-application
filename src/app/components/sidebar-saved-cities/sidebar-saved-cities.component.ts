import { Component, OnInit } from '@angular/core';
import { CitiesBusiness } from '../../business/cities.business';
import { CityLocalStorageInterface } from '../../interfaces/city-local-storage.interface';

@Component({
  selector: 'app-sidebar-saved-cities',
  templateUrl: './sidebar-saved-cities.component.html'
})
export class SidebarSavedCitiesComponent implements OnInit {

    savedCities: Array<CityLocalStorageInterface>;

    constructor(private citiesBusiness: CitiesBusiness) {}
    
    ngOnInit(): void {
        this.getSavedCities();
    }

    getSavedCities() {
        
        this.citiesBusiness.savedCities
        .subscribe((cities: Array<CityLocalStorageInterface>) => this.savedCities = cities);
    }
}
