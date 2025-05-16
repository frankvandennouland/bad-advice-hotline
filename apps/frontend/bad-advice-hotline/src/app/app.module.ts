import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';
import { UiModule } from '@bad-advice-hotline/ui';
import { BAD_ADVICE_HOTLINE_SERVICE_URL } from 'libs/store/badAdviceHoteline/src/api.tokens';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule, UiModule],
  providers: [
    provideHttpClient(),
    BadAdviceHotlineStore,
    {
      provide: BAD_ADVICE_HOTLINE_SERVICE_URL,
      useValue: environment.badAdviceHotlineServiceUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
