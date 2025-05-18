import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionEntity } from './evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { BadRequestException } from '@nestjs/common';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let evaluacionRepo: Repository<EvaluacionEntity>;
  let proyectoRepo: Repository<ProyectoEntity>;
  let profesorRepo: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluacionService,
        {
          provide: getRepositoryToken(EvaluacionEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProyectoEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProfesorEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    evaluacionRepo = module.get(getRepositoryToken(EvaluacionEntity));
    proyectoRepo = module.get(getRepositoryToken(ProyectoEntity));
    profesorRepo = module.get(getRepositoryToken(ProfesorEntity));
  });

  it('should create an evaluacion with valid proyecto and evaluador', async () => {
    const proyecto = { id: 1, notaFinal: 4.5, mentor: { id: 3 } } as ProyectoEntity;
    const evaluador = { id: 2 } as ProfesorEntity;
    const evaluacion = { id: 10, proyecto, evaluador } as EvaluacionEntity;

    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);
    (profesorRepo.findOne as jest.Mock).mockResolvedValue(evaluador);
    (evaluacionRepo.create as jest.Mock).mockReturnValue(evaluacion);
    (evaluacionRepo.save as jest.Mock).mockResolvedValue(evaluacion);
    (evaluacionRepo.findOne as jest.Mock).mockResolvedValue(evaluacion);

    const result = await service.crearEvaluacion(1, 2);
    expect(result).toEqual(evaluacion);
  });




  it('should throw error if evaluador is also mentor', async () => {
    const proyecto = { id: 1, notaFinal: 4.5, mentor: { id: 2 } } as ProyectoEntity;
    const evaluador = { id: 2 } as ProfesorEntity;

    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);
    (profesorRepo.findOne as jest.Mock).mockResolvedValue(evaluador);

    await expect(service.crearEvaluacion(1, 2)).rejects.toThrow('El evaluador no puede ser el mentor del proyecto');
  });

});
