import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
//Where the logic lives in the Providers or Services
//Specifically have a injectable decorator, so provider can be injected to any class that depends on it
@Injectable()
export class NinjasService {
    private ninjas = [
        {id: 0, name: 'ninjaA', weapon: 'stars'},
        {id: 1, name: 'ninjaB', weapon:'nunchucks'},
    ];
//provide a method that returns the collection and it allows to optionally filter the type of weapon
    getNinjas(weapon?: 'starts' | 'nunchucks') {
        if(weapon) {
            return this.ninjas.filter((ninja) => ninja.weapon===weapon);
        }
        return this.ninjas;
    }


//Logic to find a single Ninja
getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) =>ninja.id===id);
    if(!ninja) {
        throw new Error('ninja not found');
    }
    return ninja;
        }
//Logic to create ninjas
createNinja(createNinjaDto:CreateNinjaDto) {
    //generate an id automatically
    const newNinja = {
        ...createNinjaDto,
        id: Date.now(),
    }
this.ninjas.push(newNinja); //pushing the newNinja constant which includes the id plus the typeofCreateNinjaDto
return newNinja;
}
//Logic to update ninja
updateNinja(id: number, updateNinjaDto:any) {
    this.ninjas = this.ninjas.map((ninja) => {
   if (ninja.id === id) {
    return { ...ninja, ...updateNinjaDto };
   }
   return ninja;
});
return this.getNinja(id);
}

//logic to delete ninja
removeNinja(id:number) {
    const tobeRemoved = this.getNinja(id);
 this.ninjas = this.ninjas.filter((ninja) => ninja.id !==id);
 return tobeRemoved;   
}
}