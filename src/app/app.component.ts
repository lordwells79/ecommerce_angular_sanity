import { Component } from '@angular/core';
import { ContextService } from './context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-ecommerce';
  showCart: boolean = false;
  constructor(private contextService: ContextService) {
    this.contextService.showcartEvent$.subscribe(
      (val) => (this.showCart = val)
    );
  }
}
