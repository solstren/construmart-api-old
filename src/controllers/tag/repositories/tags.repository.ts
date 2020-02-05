import { Tag } from '../../../entities/tag.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> { }
