import { Injectable } from '@nestjs/common';
import { ManagerDto, UserDto } from './manager.dto';

@Injectable()
export class ManagerService {
  home() {
    const user = new UserDto();
    user.id = 1;
    user.name = 'dig';
    user.email = 'dig@example.com';
    return JSON.stringify(user);
  }

  getUser(id: number) {
    const user = new UserDto();
    user.id = id;
    user.name = 'dig';
    user.email = 'dig@example.com';
    return JSON.stringify(user);
  }

  deleteUser(id: number) {
    return JSON.stringify({ message: `User with id ${id} deleted` });
  }

  updateUser(id: number, body: any) {
    const user = new UserDto();
    user.id = id;
    user.name = body.name;
    user.email = body.email;
    return JSON.stringify(user);
  }

  createUser(body: any) {
    const user = new UserDto();
    user.id = 1;
    user.name = body.name;
    user.email = body.email;
    return JSON.stringify(user);
  }

  getMyProfile() {
    const manger = new ManagerDto();
    manger.id = 1;
    manger.name = 'dig';
    manger.email = 'dig@example.com';
    return JSON.stringify(manger);
  }

  updateMyProfile(body: any) {
    const manger = new ManagerDto();
    manger.id = body.id;
    manger.name = body.name;
    manger.email = body.email;
    return JSON.stringify(manger);
  }
}
