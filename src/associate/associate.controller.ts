import { Controller, Post, Body } from "@nestjs/common";
import { AssociateService } from "./associate.service";

import { CreateAssociateDto } from "./dto/create-associate.dto";


@Controller('associates')
export class AssociateController {
    constructor(private readonly associateService: AssociateService) {}

    @Post()
    async create(@Body() body: CreateAssociateDto) {
        return this.associateService.create(body);
    }

}