/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestingModule, Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto';
import mongoose from 'mongoose';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
describe('UsersService',()=>{
    let usersService: UsersService;
    const mockUserModel = {
        create: jest.fn()
    }
    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: "USERS_MODEL",
                    useValue: mockUserModel
                }
            ] 
        }).compile()
        usersService = module.get<UsersService>(UsersService)
    })
    it('should be defined',()=>{
        expect(usersService).toBeDefined()
    })
    it('should create a user',async()=>{
        const createUserDto: CreateUserDto ={
            name:'abdo',
            password:'12345678',
            email:'abdoelsaeed290@gmail.com',
            role:'User',
            active:true,
            gender:'male',
            avatar:'sa',
            provider:'email',
            providerId:'122121'
        }
        mockUserModel.create.mockResolvedValue({
            toObject: () => ({
                _id: new mongoose.Types.ObjectId(),
                name: createUserDto.name,
                email: createUserDto.email,
                role: createUserDto.role,
                password: createUserDto.password,
            }),
        })
        const result = await usersService.create(createUserDto)
        expect(result.status).toBe(200)
        expect(result.message).toBe('User created successfully')
        // @ts-ignore
        expect(result.data.password).toBeUndefined()
    })
    it('should throw ConflictException if email exists', async () => {
        mockUserModel.create.mockRejectedValue({ code: 11000 });

        await expect(
            usersService.create({ email: 'abdoelsaeed290@gmail.com' } as any),
        ).rejects.toThrow(ConflictException);
    });
    it('should throw InternalServerErrorException for other errors', async () => {
        mockUserModel.create.mockRejectedValue(new Error('DB error'));

        await expect(
            usersService.create({ email: 'test@test.com' } as any),
        ).rejects.toThrow(InternalServerErrorException);
    });
})