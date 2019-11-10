import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InventoryRequestDto {
    @ApiModelProperty({ required: true, type: Number, nullable: false })
    @IsNotEmpty()
    initialQuatity: number;

    @ApiModelProperty({ required: true, type: Number, nullable: false })
    @IsNotEmpty()
    initialPrice: number;

    @ApiModelProperty({ required: true, type: Number, nullable: false })
    @IsNotEmpty()
    currentQuantity: number;

    @ApiModelProperty({ required: true, type: Number, nullable: false })
    @IsNotEmpty()
    currentPrice: number;

    @ApiModelProperty({ required: true, type: Number, nullable: false })
    @IsNotEmpty()
    productId: number;
}
