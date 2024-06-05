import { Controller, Get } from '@nestjs/common';

@Controller('ninjas')  // ninja string says everything within this controller is going to have the prefix ninjas
export class NinjasController {

    // GET/ninjas --> []
@Get() //Get() decorator to tell nest this represents a route.  This tells it is a method to create an HTTP get on slash ninjas.
getNinjas() {
    return [];
}


//GET /ninjas/:ID --> { }
@Get(':id') //':id' defines the above route
getOneNinja() {
    return {}
}
}
//POST /ninjas
//PUT /ninjas/:id --> {...}
//DELETE /ninjas/:id