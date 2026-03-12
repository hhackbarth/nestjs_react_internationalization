import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { I18nLang } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@I18nLang() lang: string): string {
    return this.appService.getHello(lang);
  }

  @Get('greeting')
  getGreeting(
    @Query('name') name: string = 'World',
    @I18nLang() lang: string,
  ): string {
    return this.appService.getGreeting(name, lang);
  }

  @Get('plural')
  getPlural(
    @Query('count') count: number = 0,
    @I18nLang() lang: string,
  ): string {
    return this.appService.getPlural(count, lang);
  }
}
