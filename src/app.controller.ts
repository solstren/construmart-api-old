import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConstants } from './utils/app-constants';

@Controller(`${AppConstants.APP_BASE_URL}uploads`)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':filename')
	async serveCategoryImage(@Param('filename') filename, @Res() res): Promise<any>{
		res.sendFile(filename, {root: 'uploads'});
	}
}
