import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
     
  
  async create(data: UserDTO) {
    if (
      await this.usersRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }

    const salt = await bcrypt.genSalt();
    
    data.password =  await bcrypt.hash(data.password, salt);
   
    const user = await this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async read() {
    return this.usersRepository.find();
  }

  async readById(id: number) {
    await this.exists(id);
    return this.usersRepository.findOne({
        where: {
            userId: id
        }
    });
  }
  async update(id: number, data: UserDTO) {
    delete data.role;
    await this.exists(id);
    await this.usersRepository.update(id, data);
    return this.exists(id);
  }

  async delete(id: number) {
    await this.exists(id);
    return this.usersRepository.delete(id);
  }


  async exists(id: number) {
    if (
      !(await this.usersRepository.exists({
        where: {
          userId: id
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }
}