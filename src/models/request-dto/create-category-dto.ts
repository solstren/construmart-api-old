import { ApiModelProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiModelProperty({required: true})
  readonly name: string;

  @ApiModelProperty()
  readonly description?: string;

  @ApiModelProperty()
  readonly imageUrl?: string;
}
