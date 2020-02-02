import { BaseEntity } from "./base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { type } from "os";
import { Product } from "./product.entity";
import { Tag } from "./tag.entity";

export class TaggedProduct extends BaseEntity {
}
