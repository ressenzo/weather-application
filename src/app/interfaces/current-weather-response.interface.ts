export interface CurrentWeatherResponse {
    coord: Coord;
    name: string;
    id: number;
    main: Main;
    weather: Array<Weather>;
    sys: Sys;
}

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

interface Sys {
    country: string;
}
