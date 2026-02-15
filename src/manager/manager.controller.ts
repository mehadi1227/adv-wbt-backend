import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  home() {
    return this.managerService.home();
  }

  @Get('/user/:id')
  getUser(@Param('id') id: string) {
    return this.managerService.getUser(parseInt(id));
  }

  @Delete('/user/:id')
  deleteUser(@Param('id') id: string) {
    return this.managerService.deleteUser(parseInt(id));
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.managerService.updateUser(parseInt(id), body);
  }

  @Post('/user')
  createUser(@Body() body: any) {
    return this.managerService.createUser(body);
  }

  @Get('/profile')
  getMyProfile() {
    return this.managerService.getMyProfile();
  }

  @Post('/profile')
  updateMyProfile(@Body() body: any) {
    return this.managerService.updateMyProfile(body);
  }
}
