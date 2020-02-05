import { ResponseMessages } from './../../../utils/response-messages';
import { TagResponse } from './../../../models/response-dto/tag-response';
import { ObjectMapper } from './../../../utils/object-mapper';
import { Tag } from './../../../entities/tag.entity';
import { BaseResponse } from './../../../models/response-dto/base-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TagsRepository } from '../repositories/tags.repository';

@Injectable()
export class TagsService {
    constructor(@InjectRepository(TagsRepository) private readonly _tagRepository: TagsRepository) { }

    async getTagByName(name: string): Promise<BaseResponse> {
        let tag: Tag;
        let tagResponse: TagResponse;
        tag = await this._tagRepository.findOne({ name: name });
        if (!tag) {
            throw new NotFoundException(`Tag with name '${name}' does not exist`);
        }
        tagResponse = ObjectMapper.mapToTagResponse(tag);
        return {
            status: true,
            message: 'success',
            body: tagResponse
        };
    }

    async getTagById(id: number): Promise<BaseResponse> {
        let tag: Tag;
        let tagResponse: TagResponse;
        tag = await this._tagRepository.findOne({ id: id });
        if (!tag) {
            throw new NotFoundException(`Tag with id '${id}' does not exist`);
        }
        tagResponse = ObjectMapper.mapToTagResponse(tag);
        return {
            status: true,
            message: 'success',
            body: tagResponse
        };
    }

    async getAllTags(): Promise<BaseResponse> {
        let tags: Tag[];
        let tagResponses: TagResponse[] = [];
        tags = await this._tagRepository.find({ order: { name: 'ASC' } });
        if (tags.length > 0) {
            tags.forEach((tag) => {
                let tagResponse = ObjectMapper.mapToTagResponse(tag);
                tagResponses.push(tagResponse);
            });
        }
        return {
            status: true,
            message: ResponseMessages.SUCCESS,
            body: tagResponses
        };
    }
}
