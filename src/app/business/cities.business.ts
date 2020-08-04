import { Injectable } from '@angular/core';
import { CityLocalStorageInterface } from '../interfaces/city-local-storage.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitiesBusiness {

    public savedCities: Observable<Array<CityLocalStorageInterface>>;

    constructor() {
        this.savedCities = new BehaviorSubject<Array<CityLocalStorageInterface>>(JSON.parse(localStorage.getItem('cities'))).asObservable();
    }
}
