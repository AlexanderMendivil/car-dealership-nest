import { CarInterface } from "src/cars/interaces/car.interface";
import { v4 as uuid } from "uuid";
export const CARS_SEED: CarInterface[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corola'
    },
    
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic'
    },
    
    {
        id: uuid(),
        brand: 'Jeep',
        model: 'Cherokee'
    },
]