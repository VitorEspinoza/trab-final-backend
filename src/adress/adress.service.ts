import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdressEntity } from "./entity/adress.entity";
import { Repository } from "typeorm";
import { AdressDTO } from "./dto/adress.dto";

@Injectable()
export class AdressService{
    constructor(
    @InjectRepository(AdressEntity)
    private adressRepository: Repository<AdressEntity>,
) {}

async create(adress: AdressDTO) {
    const existingAdress = await this.adressRepository.findOne({
      where: {
        zipCode: adress.zipCode,
        number: adress.number,
      },
    });
  
    if (existingAdress) {
      return {
        message: 'Este endereço já está sendo utilizado.',
        adressId: existingAdress.adressId,
      };
    }
  
    const newAdress = await this.adressRepository.create(adress);

    return this.adressRepository.save(newAdress);
}

async read() {
    return this.adressRepository.find()
}

async readById(id: number) {
    await this.exists(id);
    return this.adressRepository.findOne({
        where: {
            adressId: id
        }
    });
  }
  async update(id: number, adress: AdressDTO) {
    await this.exists(id);
    await this.adressRepository.update(id, adress);
    return this.exists(id);
  }

  async delete(id: number) {
    await this.exists(id);
    return this.adressRepository.delete(id);
  }


  async exists(id: number) {
    if (
      !(await this.adressRepository.exists({
        where: {
          adressId: id
        },
      }))
    ) {
      throw new NotFoundException(`O endereço ${id} não existe.`);
    }
  }
}
