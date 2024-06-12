import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
// import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')  // ninja string says everything within this controller is going to have the prefix ninjas
export class NinjasController {
    constructor(private readonly ninjasService:NinjasService){}  //Ninja's controller depends on the ninja service by providing the parameter to the constructor and Nest will look at the type 
//dependency injection:
//const service = new NinjasService();
//const controller = new NinjasController(service);
 
//* 1) GET/ninjas --> [] Get() decorator to tell nest this represents a route.  This tells it is a method to create an HTTP get on slash ninjas.
//Type in HTTP:localhost:3000  & Method GET
//Return: []
// @Get()
// getNinjas() {
//     return [];
// }

//2) GET /ninjas/:ID --> { }
//Type in HTTP:localhost:3000/1  & Method GET
//Return: {}
// @Get(':id') //':id' defines the above route ninjas/:id
// getOneNinjaid()  {
//     return {}
// }

//3) GET /ninjas/:ID --> "sdff"
// how to we parse this ID from the request (browser) so that our logic down here can display it in response?, Use param within the method definition
//Nest is partsing out the URL and auto injects it into the method parameter when it gets invoked in the HTTP request
//Type in HTTP:localhost:3000/sdff & Method GET
//Return: "id": "sdff"
// @Get(':id') //':id' defines the above route ninjas/:id
// getOneNinja(@Param('id') id:string) {
//     return {
//         id,
//     }
// }
//4.3)
@Get(':id') //':id' defines the above route ninjas/:id
getOneNinja(@Param('id') id:string) {
    return this.ninjasService.getNinja(+id)//id needs to include a + bc the url is a string and it is expecting a #. + turns it into a number.
}


//4) The URL can also be a Query
    // GET/ninjas?type=fast --> "type"="fast"  If you enter the Query type inside the parameter section, it will be parsed out into the response. 
    //HTTP type: localhost:3000/ninjas?type=fast & Method GET
    //Return: "type"="fast"
    // @Get() 
    // getNinjastype(@Query('type') type:string) {  //Parsing things out the request from the URL for the request body
    //     return [{ type }]; //the type we want back into the response.
    // }

//4.4 We want to filter by weapon modified the query
//HTTP type: localhost:3000/ninjas  & Method GET
//Return: Array of 2 ninjas: 0&1,ninjaA&ninjaB with stars and nunchucks respectively
//HTTP type: localhost:3000/ninjas?weapon=stars  & Method GET
//Return: Array of 1 ninjas: id0,ninjaA with stars 
@Get() 
getNinjastype(@Query('weapon') weapon:'starts' | 'nunchucks') {  
    const service = new NinjasService() //We need the service to be injected into the controller automatically and this is done by:see line 8
    return this.ninjasService.getNinjas(weapon);  
    //MODIFICATIONS: const service = new NinjasService() <<deleted & 
    //return service.getNinjas(weapon); >> return this.ninjasService.getNinjas(weapon);  
   
}

    
//5) POST /ninjas
//Parse the request
//HTTP type: localhost:3000/ninjas & Method POST in the Body {"name": "marious"}
//Return: {"name": "marious"}
// @Post()
// createNinja(@Body() createNinjaDto:CreateNinjaDto){ //parameter=createNinjaDto & type:CreateNinjaDto from dto folder
//     return {
//         name: createNinjaDto.name,
//     };
// }
//4.5
@Post()
createNinja(@Body() createNinjaDto:CreateNinjaDto){ //parameter=createNinjaDto & type:CreateNinjaDto from dto folder
    return this.ninjasService.createNinja(createNinjaDto);
}
//6) PUT /ninjas/:id --> {...}
//Insertion of the parameter Id will allow the HTTP request to respond with the same id
// @Put(':id')
// updateNinja(@Param('id') id:string, @Body() UpdateNinjaDto:string) {
//     return {
//         id,
//         name: UpdateNinjaDto,
//     }
// }
//4.6
@Put(':id')
updateNinja(@Param('id') id:string, @Body() UpdateNinjaDto:string) {
    return this.ninjasService.updateNinja(+id, UpdateNinjaDto);
}
//7)DELETE /ninjas/:id
// @Delete(':id') 
// removeNinja() {
//     return {}    ;
// }
// }
//4.7)Updating the Service
@Delete(':id') 
removeNinja(@Param('id') id:string) {
    return this.ninjasService.removeNinja(+id,);
}
}