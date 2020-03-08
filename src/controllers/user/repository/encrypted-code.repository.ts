import { EncryptedCode } from '../../../entities/encrypted-code.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EncryptedCode)
export class EncryptedCodeRepository extends Repository<EncryptedCode> {

}