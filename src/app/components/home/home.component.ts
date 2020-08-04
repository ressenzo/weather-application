import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { CurrentWeatherResponse } from '../../interfaces/current-weather-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentWeather: CurrentWeatherResponse;
  loading = true;
  imageUrl: string;
  
  constructor(private citiesService: CitiesService) {}
  
  ngOnInit(): void {
    this.getCityWeatherByName();
  }
  
  getCityWeatherByName(): void {
    
    this.citiesService.getCityWeatherByName('London').subscribe((currentWeather: CurrentWeatherResponse) => {
      this.currentWeather = currentWeather
      this.imageUrl = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
      this.loading = false;
    });
  }
}
