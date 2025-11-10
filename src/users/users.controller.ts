import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from './users.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({
        summary: "Cria um novo usuário",
    })
    @ApiCreatedResponse({
        description: "Usuário criado com sucesso",
        type: Users
    })
    @ApiBadRequestResponse({
        description: "Email já está cadastrado",
        type: BadRequestException
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({
        summary: "Pega todos os usuários existentes",
    })
    @ApiOkResponse({
        type: Users,
        isArray: true
    })
    getAll() {
        return this.usersService.getAll();
    }
}
