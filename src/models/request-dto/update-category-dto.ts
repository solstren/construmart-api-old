import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly imageUrl: string;

    // @ApiModelProperty({required: true})
    // readonly rowVersion: number;
}