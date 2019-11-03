import { ApiModelProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiModelProperty()
  readonly body: any;

  @ApiModelProperty()
  readonly status: boolean;

  @ApiModelProperty()
  readonly message: string;
}
