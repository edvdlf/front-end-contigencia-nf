import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from "primeng/card";

import { MessageService } from 'primeng/api';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Message } from "primeng/message";

@Component({
  selector: 'app-recupera-senha',
  imports: [
    CommonModule,
    Card,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    RippleModule,
    Message
],
  templateUrl: './recupera-senha.component.html',
  styleUrl: './recupera-senha.component.scss'
})
export class RecuperaSenhaComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

 carregando = false;
mensagemSucesso: string | null = null;
   _email=undefined;
submitted = false;

private formBuilder = inject(FormBuilder);

private messageService= inject (MessageService);
private route= inject(ActivatedRoute);


  recuperarSenhaForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]

  });

  get f() {
    return this.recuperarSenhaForm.controls;
  }

  
 

}
