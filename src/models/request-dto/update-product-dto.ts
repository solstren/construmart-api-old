import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly description: string;

    @ApiModelProperty()
    readonly imageUrl: string;

    @ApiModelProperty()
    readonly price: number;


    // @ApiModelProperty({required: true})
    // readonly rowVersion: number;
}