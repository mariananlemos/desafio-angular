import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
//import { CartListService } from '../../services/cartlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  wishlistCount$: Observable<number>;
  //cartListCount$: Observable<number>;


  constructor(private wishlistService: WishlistService /*, private cartListService: CartListService*/) {
    this.wishlistCount$ = this.wishlistService.count$;
    //this.cartListCount$ = this.cartListService.count$;
  }
}
