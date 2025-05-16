import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BAD_ADVICE_HOTLINE_SERVICE_URL,
  BadAdviceHotlineStore,
} from '@bad-advice-hotline/store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
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
