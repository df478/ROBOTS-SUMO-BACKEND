import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto): Promise<string | null> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) return null;

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) return null;

    return this.jwtService.sign({
    id: user.id,
    email: user.email,
    role: user.rol,
  });
  }
}
