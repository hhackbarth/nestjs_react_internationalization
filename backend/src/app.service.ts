import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}

  getHello(lang: string): string {
    return this.i18n.translate('common.api.hello', { lang });
  }

  getGreeting(name: string, lang: string): string {
    return this.i18n.translate('common.api.greeting', { lang, args: { name } });
  }

  getPlural(count: number, lang: string): string {
    return this.i18n.translate('common.api.plural', { lang, args: { count } });
  }
}
