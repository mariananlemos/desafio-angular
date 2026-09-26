import { Component, OnInit } from '@angular/core';
import { CommonModule, FormatWidth } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartListService } from '../../services/cartlist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cartList',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cartList.component.html',
  styleUrl: './cartList.component.css'
})
export class CartListComponent implements OnInit {
  itensCartList$: Observable<Product[]>;
  productQuantity: number[] = [];

  constructor(private cartListService: CartListService) {
    this.itensCartList$ = this.cartListService.cartlist$;
  }

  formItem = new FormGroup({
    productQuantity: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {}

  remover(produtoId: number): void {
    this.cartListService.removeFromCartList(produtoId);
  }

  limparTudo(): void {
    if (confirm('Tem certeza que deseja esvaziar seu carrinho?')) {
      this.cartListService.clearCartList();
    }
  }
  
  //Altera a quantidade do produto será comprada
  alterarQuantidade() {
    if(this.formItem.valid){
      this.productQuantity.push(this.formItem.value.productQuantity!);
      this.formItem.reset({productQuantity: 1});
    }
  }


}
