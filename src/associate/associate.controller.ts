import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UsePipes, ValidationPipe, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { AssociateService } from "./associate.service";

import { CreateAssociateDto } from "./dto/create-associate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";
import { ParseJsonPipe } from "src/pipes/parse-json.pipe";
import { ParseJsonInterceptor } from "src/interceptors/parse-json.interceptor";



import { Roles } from 'src/decorators/role.decorator';

import { Role } from 'src/enums/role.enum';
import { UpdateAssociateDTO } from './dto/update-associate.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserOwnsRouteGuard } from 'src/guards/user-owns-route.guard';
import { UserOwnsRouteOptions } from 'src/decorators/user-owns-route-options.decorator';

@Controller('associates')
export class AssociateController {
    constructor(private readonly associateService: AssociateService, private readonly fileService: FileService) {}

    @UseInterceptors(FileInterceptor('photo'), ParseJsonInterceptor)
    @Post()
    @UsePipes(new ValidationPipe(), new ParseJsonPipe(CreateAssociateDto))
    async create(@Body() body: CreateAssociateDto,  @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: /(jpg|jpeg|png)$/}),
            new MaxFileSizeValidator({maxSize: 1024 * 5000}),
        ],
        fileIsRequired: false
    })) photo?: Express.Multer.File){    
      return this.associateService.create(body, photo);
    }

    
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async read() {
    return this.associateService.read();
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Get(':id')
  async readById(@Param('id') id: string) {
    return this.associateService.readById(id);
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Get('by-user/:id')
  async readByUserId(@Param('id') id: string) {
    return this.associateService.readByUserId(id);
  }


  @UseInterceptors(FileInterceptor('photo'), ParseJsonInterceptor)
  @UsePipes(new ValidationPipe(), new ParseJsonPipe(UpdateAssociateDTO))
  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Put(':id')
  async update(@Body() body: UpdateAssociateDTO, @Param('id') id: string,  @UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({fileType: /(jpg|jpeg|png)$/}),
            new MaxFileSizeValidator({maxSize: 1024 * 5000}),
        ],
        fileIsRequired: false
    })) photo?: Express.Multer.File) {
      
    return this.associateService.update(id, body, photo);
  }

  @UserOwnsRouteOptions({ allowAdmin: true})
  @Roles(Role.ADMIN, Role.ASSOCIATE)
  @UseGuards(AuthGuard, RoleGuard, UserOwnsRouteGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.associateService.delete(id);
  }
}
