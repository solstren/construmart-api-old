import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDefined } from "class-validator";

export class CreateCategoryDto {
  @ApiModelProperty({required: true})
  @IsNotEmpty() 
  @IsDefined()
  readonly name: string;

  @ApiModelProperty()
  readonly description?: string;

  @ApiModelProperty()
  readonly imageUrl?: string;
}
