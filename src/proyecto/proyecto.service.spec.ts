import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { ProfesorEntity } from '../profesor/profesor.entity';
import { EvaluacionEntity } from '../evaluacion/evaluacion.entity';
import { Long, Repository } from 'typeorm';
import { ProyectoDTO } from './proyecto.dto';
import { faker } from '@faker-js/faker';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepo: Repository<ProyectoEntity>;
  let estudianteRepo: Repository<EstudianteEntity>;
  let profesorRepo: Repository<ProfesorEntity>;
  let evaluacionRepo: Repository<EvaluacionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        { provide: getRepositoryToken(ProyectoEntity), useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn(), find: jest.fn() } },
        { provide: getRepositoryToken(EstudianteEntity), useValue: { findOne: jest.fn(), save: jest.fn() } },
        { provide: getRepositoryToken(ProfesorEntity), useValue: { findOne: jest.fn(), save: jest.fn() } },
        { provide: getRepositoryToken(EvaluacionEntity), useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepo = module.get(getRepositoryToken(ProyectoEntity));
    estudianteRepo = module.get(getRepositoryToken(EstudianteEntity));
    profesorRepo = module.get(getRepositoryToken(ProfesorEntity));
    evaluacionRepo = module.get(getRepositoryToken(EvaluacionEntity));
  });

  it('should create a valid proyecto', async () => {
    const proyectoDto: ProyectoDTO = {
      titulo: 'Este es un titulo suficientemente largo',
      area: 'Software',
      presupuesto: 1000,
      notaFinal: 4.5,
      estado: 2,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-01',
      liderId: 1,
      mentorId: 2,
      evaluacionesIds: [3],
    };

    const lider = { id: 1, proyectos: [] } as unknown as EstudianteEntity;
    const mentor = { id: 2, mentorias: [] } as unknown as ProfesorEntity;
    const evaluacion = { id: 3 } as unknown as EvaluacionEntity;
    const proyecto = { id: 10, ...proyectoDto } as unknown as ProyectoEntity;

    (estudianteRepo.findOne as jest.Mock).mockResolvedValue(lider);
    (profesorRepo.findOne as jest.Mock).mockResolvedValue(mentor);
    (evaluacionRepo.findOne as jest.Mock).mockResolvedValue(evaluacion);
    (proyectoRepo.create as jest.Mock).mockReturnValue(proyecto);
    (proyectoRepo.save as jest.Mock).mockResolvedValue(proyecto);
    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);

    const result = await service.crearProyecto(proyectoDto);

    expect(result).toEqual(proyecto);
    expect(estudianteRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(profesorRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
    expect(evaluacionRepo.findOne).toHaveBeenCalledWith({ where: { id: 3 } });
  });

  it('should throw error if presupuesto or titulo is invalid', async () => {
    const dto = { titulo: 'Muy corto', presupuesto: 0 } as ProyectoDTO;
    await expect(service.crearProyecto(dto)).rejects.toThrow('El presupuesto debe ser mayor a 0 y el título debe tener más de 15 caracteres');
  });

  /*
  it('should find a proyecto by id', async () => {
    const proyecto = { id: 1, titulo: 'Proyecto X' } as unknown as ProyectoEntity;
    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);
    const result = await service.findProyecto(1);
    expect(result).toEqual(proyecto);
  });

  it('should return null if proyecto not found', async () => {
    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(null);
    const result = await service.findProyecto(999);
    expect(result).toBeNull();
  });
  */

  it('should advance project if estado < 4', async () => {
    const proyecto = { id: 1, estado: 3 } as ProyectoEntity;
    (proyectoRepo.findOne as jest.Mock).mockResolvedValueOnce(proyecto); // first call
    (proyectoRepo.save as jest.Mock).mockResolvedValue({ ...proyecto, estado: 4 });
    (proyectoRepo.findOne as jest.Mock).mockResolvedValueOnce({ ...proyecto, estado: 4 }); // second call

    const result = await service.avanzarProyecto(1);
    expect(result).not.toBeNull();
    expect(result!.estado).toEqual(4);
  });

  it('should throw error if project is already at max estado', async () => {
    const proyecto = { id: 1, estado: 4 } as ProyectoEntity;
    (proyectoRepo.findOne as jest.Mock).mockResolvedValue(proyecto);
    await expect(service.avanzarProyecto(1)).rejects.toThrow('El proyecto ya tiene su estado en el máximo valor posible');
  });

  it('should return list of students that have at least 1 proyect', async () => {
    const lider1 = { id: 1 } as EstudianteEntity;
    const lider2 = { id: 2 } as EstudianteEntity;
    (proyectoRepo.find as jest.Mock).mockResolvedValue([
      { lider: lider1 },
      { lider: lider2 },
      { lider: lider1 },
    ]);

    const result = await service.findAllEstudiantes();
    expect(result).toHaveLength(2); 
    expect(result.map(e => e.id)).toEqual(expect.arrayContaining([1, 2]));
  });

  it('should return empty list if there are no projects', async () => {
  (proyectoRepo.find as jest.Mock).mockResolvedValue([]);
  const result = await service.findAllEstudiantes();
  expect(result).toEqual([]);
});

});
