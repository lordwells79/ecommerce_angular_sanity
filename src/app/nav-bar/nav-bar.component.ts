import { Component } from '@angular/core';
import { Cart, ContextService } from './../context.service';
import { faCoffee, faBagShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  faCoffee = faCoffee;
  faBagShopping = faBagShopping;
  items: number = 0;

  constructor(private contextService: ContextService) {}
  ngOnInit(): void {
    this.contextService.loadCart();

    this.contextService.getCartItemCount().subscribe((itemsConunt) => {
      this.items = itemsConunt;
    });
  }

  setShowCart(val: any) {
    this.contextService.setShowCart(val);
  }
}
