import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('lang') lang: string = 'en'): string {
    return this.appService.getHello(lang);
  }

  @Get('greeting')
  getGreeting(
    @Query('name') name: string = 'World',
    @Query('lang') lang: string = 'en'
  ): string {
    return this.appService.getGreeting(name, lang);
  }

  @Get('plural')
  getPlural(
    @Query('count') count: number = 0,
    @Query('lang') lang: string = 'en'
  ): string {
    return this.appService.getPlural(count, lang);
  }
}
