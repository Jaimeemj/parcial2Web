import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDTO } from './profesor.dto';

@Controller('')
export class ProfesorController {

        constructor(private readonly profesorService: ProfesorService) {}
    @Post('crearProfesor')
    async crearProfesor(
        @Body() data: ProfesorDTO
    ){
        
        return await this.profesorService.crearProfesor(data);
    }

    
    @Patch('asignarEvaluador/:idProfesor/:idEvaluacion')
    async asignarEvaluador(
    @Param('idProfesor') idProfesor: number,
    @Param('idEvaluacion') idEvaluacion: number,
    ) {
    return await this.profesorService.asignarEvaluador(idProfesor, idEvaluacion);
    }
    

}
