import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Users } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({
        summary: 'Cria um novo usuário',
    })
    @ApiCreatedResponse({
        description: 'Usuário criado com sucesso',
        type: Users,
    })
    @ApiBadRequestResponse({
        description: 'Email já está cadastrado',
        type: BadRequestException,
    })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Atualiza um usuário pelo seu ID',
    })
    @ApiOkResponse({
        description: 'Usuário atualizado com sucesso',
        type: Users,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não encontrado',
        type: NotFoundException,
    })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Pega todos os usuários existentes',
    })
    @ApiOkResponse({
        type: Users,
        isArray: true,
    })
    getAll() {
        return this.usersService.getAll();
    }
}
