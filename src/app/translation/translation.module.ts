import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { Observable, of } from 'rxjs';
import { es } from './locales/es/global';
import { en } from './locales/en/global';
import { pt } from './locales/pt/global';

export class CustomTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      if (lang === 'en') {
        return of(en);
      } else if (lang === 'pt') {
        return of(pt);
      } else if (lang === 'es') {
        return of(es);
      } else {
        return of(es);
      }
    }
  }