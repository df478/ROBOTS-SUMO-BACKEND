import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
@Controller()
export class AppController {
  constructor() {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  getHello(): string {
    return 'Hello World! This is the backend of the AGETIC internship project.';
  }
}
