import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InventoryRequestDto {
    @ApiModelProperty({ required: true, nullable: false })
    @IsNotEmpty()
    initialQuantity: number;

    @ApiModelProperty({ required: true, nullable: false })
    @IsNotEmpty()
    initialPrice: number;

    @ApiModelProperty({ required: true, nullable: false })
    @IsNotEmpty()
    currentQuantity: number;

    @ApiModelProperty({ required: true, nullable: false })
    @IsNotEmpty()
    currentPrice: number;

    @ApiModelProperty({ required: true, nullable: false })
    @IsNotEmpty()
    productId: number;
}
