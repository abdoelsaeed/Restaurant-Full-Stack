/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Model } from 'mongoose';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Users } from './interfaces/user.interface';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try{
      const userObject = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role || 'User',
        age: createUserDto.age,
        phone_number: createUserDto.phone_number,
        address: createUserDto.address,
        active: createUserDto.active,
        verification_Code: createUserDto.verification_Code,
      };
      
      const user = await this.userModel.create(userObject);
      
      const { password, ...userWithoutPassword } = user.toObject();
      
      return {
        message: 'User created successfully',
        status: 200,
        data: userWithoutPassword,
      };
    }catch(err){
      if(err?.code === 11000){
        throw new ConflictException('Email already exists');
      }
    throw new InternalServerErrorException(err.message);

    }
  }


  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
