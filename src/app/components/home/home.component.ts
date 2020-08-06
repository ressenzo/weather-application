import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { CurrentWeatherResponse } from '../../interfaces/current-weather-response.interface';
import { CitiesBusiness } from '../../business/cities.business';
import { CityLocalStorageInterface } from '../../interfaces/city-local-storage.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentWeather: CurrentWeatherResponse;
  loading = false;
  imageUrl: string;
  cityWasAdded = false;
  
  constructor(private citiesBusines: CitiesBusiness) {}
  
  ngOnInit(): void {
    this.getCityWeatherByName();
    this.getLoading();
  }
  
  getCityWeatherByName(): void {

    this.citiesBusines.wantedCity.subscribe((currentWeather: CurrentWeatherResponse) => {
      if (currentWeather) {
        this.currentWeather = currentWeather;
        this.imageUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
        this.verifyIfCityIsAlreadyAdded(currentWeather.id);
      }
    });
  }

  getLoading() {
    this.citiesBusines.gettingCityWeather.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  addCity(id: number, name: string, country: string) {
    
    const city: CityLocalStorageInterface = {
      country,
      id,
      name
    };

    this.citiesBusines.addCityToLocalStorage(city);
    this.verifyIfCityIsAlreadyAdded(id);
  }

  removeCity(id: number) {

    this.citiesBusines.removeCityFromLocalStorage(id);
    this.verifyIfCityIsAlreadyAdded(id);
  }
  
  verifyIfCityIsAlreadyAdded(id: number) {

    this.cityWasAdded = this.citiesBusines.cityAlreadyAdded(id);
  }
}
