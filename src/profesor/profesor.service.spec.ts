import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { ProfesorDTO } from './profesor.dto';
import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let profesorRepo: Repository<ProfesorEntity>;
  let evaluacionRepo: Repository<EvaluacionEntity>;
  let proyectoRepo: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(EvaluacionEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ProyectoEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    profesorRepo = module.get(getRepositoryToken(ProfesorEntity));
    evaluacionRepo = module.get(getRepositoryToken(EvaluacionEntity));
    proyectoRepo = module.get(getRepositoryToken(ProyectoEntity));
  });

  it('should create a valid profesor', async () => {
    const dto: ProfesorDTO = {
      cedula: 123456789,
      nombre: 'Carlos Test',
      departamento: 'Matemáticas',
      extension: 5,
      esParEvaluado: true,
      mentoriasIds: [1],
      evaluacionesIds: [2]
    };

    const proyecto = { id: 1 } as ProyectoEntity;
    const evaluacion = { id: 2 } as unknown as EvaluacionEntity;
    const profesor = { id: 3, ...dto, mentorias: [proyecto], evaluaciones: [evaluacion] } as ProfesorEntity;

    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);
    (evaluacionRepo.findOne as jest.Mock).mockResolvedValue(evaluacion);
    (profesorRepo.create as jest.Mock).mockReturnValue(profesor);
    (profesorRepo.save as jest.Mock).mockResolvedValue(profesor);
    (profesorRepo.findOne as jest.Mock).mockResolvedValue(profesor);

    const result = await service.crearProfesor(dto);

    expect(result).toEqual(profesor);
  });

  it('should throw error if extension is not 5', async () => {
    const dto = {
      cedula: 123456789,
      nombre: 'Carlos Falso',
      departamento: 'FakeDept',
      extension: 4,
      esParEvaluado: false,
      mentoriasIds: [],
      evaluacionesIds: [],
    } as ProfesorDTO;

    await expect(service.crearProfesor(dto)).rejects.toThrow('El profesor no tiene la extensión esperada');
  });

  it('should assign an evaluacion to profesor', async () => {
    const profesor = { id: 1, evaluaciones: [] } as unknown as ProfesorEntity;
    const evaluacion = { id: 2 } as unknown as EvaluacionEntity;

    (profesorRepo.findOne as jest.Mock).mockResolvedValue(profesor);
    (evaluacionRepo.findOne as jest.Mock).mockResolvedValue(evaluacion);
    (profesorRepo.save as jest.Mock).mockResolvedValue(profesor);
    (evaluacionRepo.save as jest.Mock).mockResolvedValue(evaluacion);

    const result = await service.asignarEvaluador(1, 2);

    expect(result).toEqual({
      message: 'Evaluador asignado correctamente',
      evaluacionId: 2,
      profesorId: 1
    });
  });

  it('should throw error if profesor has 3 or more evaluaciones', async () => {
    const profesor = { id: 1, evaluaciones: [{}, {}, {}] } as ProfesorEntity;
    const evaluacion = { id: 2 } as unknown as EvaluacionEntity;

    (profesorRepo.findOne as jest.Mock).mockResolvedValue(profesor);
    (evaluacionRepo.findOne as jest.Mock).mockResolvedValue(evaluacion);

    await expect(service.asignarEvaluador(1, 2)).rejects.toThrow('El evaluador tiene 3 o más evaluaciones');
  });
  

  
});
