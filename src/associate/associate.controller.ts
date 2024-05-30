import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UsePipes, ValidationPipe, InternalServerErrorException } from "@nestjs/common";
import { AssociateService } from "./associate.service";

import { CreateAssociateDto } from "./dto/create-associate.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "src/file/file.service";
import { ParseJsonPipe } from "src/pipes/parse-json.pipe";
import { ParseJsonInterceptor } from "src/interceptors/parse-json.interceptor";



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

}