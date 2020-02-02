import { BaseResponse } from './../../models/response-dto/base-response';
import { AppConstants } from './../../utils/app-constants';
import { TagsService } from './services/tags.service';
import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@Controller('tag')
export class TagController {
    constructor(private _tagService: TagsService) { }

    @ApiOkResponse({
        description: AppConstants.SWAGGER_200_DESCRIPTION,
        type: BaseResponse
    })
    @ApiNotFoundResponse({
        description: AppConstants.SWAGGER_404_DESCRIPTION,
        type: BaseResponse
    })
    @ApiInternalServerErrorResponse({
        description: AppConstants.SWAGGER_500_DESCRIPTION
    })
    @Get()
    async getAllTags(): Promise<BaseResponse> {
        return await this._tagService.getAllTags();
    }
}
