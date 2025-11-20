import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    perfil: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('debería registrar usuario', async () => {
    const dto = { nombre: 'Juan', email: 'juan@pepe.com', password: '123' };
    mockAuthService.register.mockResolvedValue({ id: 'uuid', ...dto });

    expect(await controller.register(dto)).toEqual({ id: 'uuid', ...dto });
    expect(service.register).toHaveBeenCalledWith(dto);
  });

  it('debería iniciar sesión', async () => {
    const dto = { email: 'juan@pepe.com', password: '1234' };
    const response = { access_token: 'token123', usuario: {} };

    mockAuthService.login.mockResolvedValue(response);

    expect(await controller.login(dto)).toBe(response);
  });

  it('debería cerrar sesión', async () => {
    mockAuthService.logout.mockResolvedValue({ mensaje: 'Sesión cerrada exitosamente' });

    expect(await controller.logout()).toEqual({
      mensaje: 'Sesión cerrada exitosamente',
    });
  });


});
