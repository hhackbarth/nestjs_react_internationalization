import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private translations: any = {};
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly i18n: I18nService) {
    // Manuell Übersetzungen laden
    try {
      const enPath = path.join(process.cwd(), 'i18n/en/common.json');
      const dePath = path.join(process.cwd(), 'i18n/de/common.json');
      
      if (fs.existsSync(enPath)) {
        this.translations.en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
      }
      if (fs.existsSync(dePath)) {
        this.translations.de = JSON.parse(fs.readFileSync(dePath, 'utf-8'));
      }
    } catch (error) {
      this.logger.error('Failed to load translations:', error);
    }
  }

  getHello(lang: string): string {
    return this.translate('api.hello', lang);
  }

  getGreeting(name: string, lang: string): string {
    return this.translate('api.greeting', lang, { name });
  }

  getPlural(count: number, lang: string): string {
    return this.translate('api.plural', lang, { count }, count);
  }

  private translate(key: string, lang: string, args?: any, pluralForm?: number): string {
    const keys = key.split('.');
    let value: any = this.translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Fallback: return key if not found
      }
    }

    if (typeof value === 'string') {
      // Handle interpolation
      if (args) {
        for (const [argKey, argValue] of Object.entries(args)) {
          value = value.replace(new RegExp(`{{${argKey}}}`, 'g'), String(argValue));
        }
      }
      return value;
    }

    // Handle pluralization
    if (pluralForm !== undefined && typeof value === 'object') {
      if (pluralForm === 0 && value.zero) return value.zero;
      if (pluralForm === 1 && value.one) return value.one;
      if (value.other) return value.other;
    }

    return key; // Fallback
  }
}
