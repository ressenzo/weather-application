import { Injectable } from '@angular/core';
import { CityLocalStorageInterface } from '../interfaces/city-local-storage.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentWeatherResponse } from '../interfaces/current-weather-response.interface';
import { CitiesService } from '../services/cities.service';

@Injectable({
  providedIn: 'root',
})
export class CitiesBusiness {

  private savedCitiesSubject: BehaviorSubject<Array<CityLocalStorageInterface>>;
  public savedCities: Observable<Array<CityLocalStorageInterface>>;

  private wantedCitySubject: BehaviorSubject<CurrentWeatherResponse>;
  public wantedCity: Observable<CurrentWeatherResponse>;

  private gettingCityWeatherSubject: BehaviorSubject<boolean>;
  public gettingCityWeather: Observable<boolean>;

  constructor(private citiesService: CitiesService) {
    this.savedCitiesSubject = new BehaviorSubject<Array<CityLocalStorageInterface>>(JSON.parse(localStorage.getItem('cities')));
    this.savedCities = this.savedCitiesSubject.asObservable();

    this.wantedCitySubject = new BehaviorSubject<CurrentWeatherResponse>(null);
    this.wantedCity = this.wantedCitySubject.asObservable();

    this.gettingCityWeatherSubject = new BehaviorSubject<boolean>(false);
    this.gettingCityWeather = this.gettingCityWeatherSubject.asObservable();
  }

  addCityToLocalStorage(city: CityLocalStorageInterface) {
    
    let savedCities = this.getCitiesFromLocalStorage();

    if (!savedCities) {
      savedCities = []; 
    }

    savedCities.push(city);

    this.saveCitiesInLocalStorage(savedCities);
  }

  cityAlreadyAdded(id: number): boolean {

    let cities = this.getCitiesFromLocalStorage();

    if (cities && cities.length > 0) {
      const cityWasAdded = cities.filter(x => x.id === id);
      return cityWasAdded.length > 0;
    }   

    return false;
  }

  getCityWeatherById(id: number) {

    this.gettingCityWeatherSubject.next(true);
    this.citiesService.getCityWeatherById(id).subscribe((currentWeather: CurrentWeatherResponse) => {

      this.wantedCitySubject.next(currentWeather);
      this.gettingCityWeatherSubject.next(false);
    });
  }

  getCityWeatherByName(name: string) {

    this.gettingCityWeatherSubject.next(true);
    this.citiesService.getCityWeatherByName(name).subscribe((currentWeather: CurrentWeatherResponse) => {
      this.wantedCitySubject.next(currentWeather);
      this.gettingCityWeatherSubject.next(false);
    });
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
