import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';
import { UiModule } from '@bad-advice-hotline/ui';
import { BAD_ADVICE_HOTLINE_SERVICE_URL } from 'libs/store/badAdviceHoteline/src/api.tokens';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiModule, AppRoutingModule],
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
