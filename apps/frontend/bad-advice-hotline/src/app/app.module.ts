import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  PLAYGROUND_SERVICE_URL,
  PlaygroundStore,
} from '@bad-advice-hotline/store/playground';
import { UiModule } from '@bad-advice-hotline/ui';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiModule],
  providers: [
    provideHttpClient(),
    PlaygroundStore,
    {
      provide: PLAYGROUND_SERVICE_URL,
      useValue: environment.playgroundServiceUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
