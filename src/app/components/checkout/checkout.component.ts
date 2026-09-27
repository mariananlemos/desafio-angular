import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  formEnviado = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]],
      pagamento: ['cartao', [Validators.required]]
    });
  }

  // Atalho para facilitar a verificação dos campos no HTML
  get f() {
    return this.checkoutForm.controls;
  }

  finalizarPedido(): void {
    if (this.checkoutForm.valid) {
      this.formEnviado = true;
      console.log('Pedido realizado com sucesso:', this.checkoutForm.value);
    } else {
      // Marca todos os campos como tocados para exibir os erros em vermelho
      this.checkoutForm.markAllAsTouched();
    }
  }
}
