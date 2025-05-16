import { Component, inject } from '@angular/core';
import { BadAdviceHotlineStore } from '@bad-advice-hotline/store';

@Component({
  selector: 'bad-advice-hotline-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected store = inject(BadAdviceHotlineStore);

  onLogout() {
    this.store.logout();
  }
}
