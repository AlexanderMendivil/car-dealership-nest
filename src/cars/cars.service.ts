import { BadRequestException, Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CarInterface } from './interaces/car.interface';
import { v4 as uuid } from 'uuid'; 
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: CarInterface[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        }, 
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee',
        }];


    findAll(){
        return this.cars;
    }

    findOneById(id: string){ 
        const car = this.cars.find( car => car.id === id );
        if(!car) throw new NotFoundException(`Car with id ${id} not found.`);
        
        return car;
    }

    create(createCarDto: CreateCarDto){
        const car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( car );
        return car;
    }
    
    update( id: string, updateCarDto: UpdateCarDto ){
        let carDB = this.findOneById( id );

        if(updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException('Car id is not valid inside body');
        this.cars = this.cars.map( car => {
            if(car.id === id){
                carDB = { ...carDB, ...updateCarDto, id };
                return carDB;
            }
            return car;
        });

        return carDB;
    }
    
    delete( id: string ){
        
        const car = this.findOneById( id )
        if(!car) throw new BadRequestException(`There is no car with id ${ id }`);

        return this.cars.filter( car => car.id !== id);
    }

    fillCarsWithSeedData(cars: CarInterface[]){
        this.cars = cars;
    }
}
