import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity';
import { Long, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { EstudianteDTO } from './estudiante.dto';


describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepo: Repository<EstudianteEntity>;
  let proyectoRepo: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
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

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepo = module.get(getRepositoryToken(EstudianteEntity));
    proyectoRepo = module.get(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new estudiante', async () => {
    const estudianteDto: EstudianteDTO = {
      cedula: faker.number.int({ min: 1000000000 }),
      nombre: faker.person.fullName(),
      semestre: 6,
      programa: faker.commerce.department(),
      promedio: 4.0,
      proyectosIds: [1],
    };

    const fakeProyecto = { id: 1 } as ProyectoEntity;
    const fakeEstudiante = { id: 99, ...estudianteDto, proyectos: [fakeProyecto] } as EstudianteEntity;

    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(fakeProyecto);
    (estudianteRepo.create as jest.Mock).mockReturnValue(fakeEstudiante);
    (estudianteRepo.save as jest.Mock).mockResolvedValue(fakeEstudiante);
    (estudianteRepo.findOne as jest.Mock).mockResolvedValue(fakeEstudiante);
    (proyectoRepo.save as jest.Mock).mockResolvedValue({ ...fakeProyecto, lider: fakeEstudiante });

    const result = await service.crearEstudiante(estudianteDto);

    expect(result).toEqual(fakeEstudiante);
    expect(estudianteRepo.create).toHaveBeenCalled();
    expect(estudianteRepo.save).toHaveBeenCalled();
  });

  it('create should throw an error for invalid promedio', async () => {
    const estudianteDto: EstudianteDTO = {
      cedula: faker.number.int({ min: 1000000000 }),
      nombre: faker.person.fullName(),
      semestre: 2,
      programa: faker.commerce.department(),
      promedio: 2.5,
      proyectosIds: [],
    };

    await expect(service.crearEstudiante(estudianteDto)).rejects.toThrow('EL promedio no esta dentro de lo esperado');
    expect(estudianteRepo.create).not.toHaveBeenCalled();
  });

  it('delete should remove a estudiante without projects', async () => {
    const estudiante = { id: 1, proyectos: [] } as unknown as EstudianteEntity;

    (estudianteRepo.findOne as jest.Mock).mockResolvedValue(estudiante);
    (estudianteRepo.remove as jest.Mock).mockResolvedValue(undefined);
    await service.eliminarEstudiante(estudiante.id);

    expect(estudianteRepo.remove).toHaveBeenCalledWith(estudiante);
  });

  it('delete should throw an error if estudiante has projects', async () => {
    const estudiante = { id: 2, proyectos: [{}] } as EstudianteEntity;

    (estudianteRepo.findOne as jest.Mock).mockResolvedValue(estudiante);
    await expect(service.eliminarEstudiante(estudiante.id)).rejects.toThrow('El estudiante aun tiene proyectos activos');
    await expect(service.eliminarEstudiante(estudiante.id)).rejects.toThrow('El estudiante aun tiene proyectos activos');
    expect(estudianteRepo.remove).not.toHaveBeenCalled();
  });


});