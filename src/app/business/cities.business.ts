import { Injectable } from '@angular/core';
import { CityLocalStorageInterface } from '../interfaces/city-local-storage.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesBusiness {

  private savedCitiesSubject: BehaviorSubject<Array<CityLocalStorageInterface>>;
  public savedCities: Observable<Array<CityLocalStorageInterface>>;

  constructor() {
    this.savedCitiesSubject = new BehaviorSubject<Array<CityLocalStorageInterface>>(JSON.parse(localStorage.getItem('cities')));
    this.savedCities = this.savedCitiesSubject.asObservable();
  }

  addCityToLocalStorage(city: CityLocalStorageInterface) {
    
    let savedCities = this.getCitiesFromLocalStorage();

    savedCities.push(city);

    this.saveCitiesInLocalStorage(savedCities);
  }

  removeCityFromLocalStorage(id: number) {
    
    let savedCities = this.getCitiesFromLocalStorage();

    let notRemovedCities = savedCities.filter(x => x.id !== id);

    this.saveCitiesInLocalStorage(notRemovedCities);
  }

  getCitiesFromLocalStorage() : Array<CityLocalStorageInterface> {

    let savedCities = JSON.parse(localStorage.getItem('cities')) as Array<CityLocalStorageInterface>;

    return savedCities;
  }

  private saveCitiesInLocalStorage(cities: Array<CityLocalStorageInterface>) {

    localStorage.setItem('cities', JSON.stringify(cities));

    this.savedCitiesSubject.next(cities);
  }
}
