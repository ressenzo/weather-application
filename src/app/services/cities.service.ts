import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentWeatherResponse } from '../interfaces/current-weather-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {

    constructor(private http: HttpClient) {}

    getCityWeatherByName(name: string): Observable<CurrentWeatherResponse> {

      return this.http.get<CurrentWeatherResponse>(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID={app_id}`);
    }

    getCityWeatherById(id: number): Observable<CurrentWeatherResponse> {

      return this.http.get<CurrentWeatherResponse>(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid={app_id}`);
    }
}
