import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from '../models/auth.model';

import { LocalStorageService, UsuarioLocalStorage } from '../../core/services/local-storage.service';
import { Message } from "primeng/message";
import { Password, PasswordModule } from "primeng/password";
import { Checkbox, CheckboxModule } from "primeng/checkbox";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { lastValueFrom } from 'rxjs';
import { LoginService } from './login.service';
import { ILogin } from '../models/login.model';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  imports: [
  CommonModule, ReactiveFormsModule,
    PasswordModule, CheckboxModule, ButtonModule,
    FormsModule, ButtonModule, CheckboxModule,
    ToastModule,
    RouterLink,
    
  ],
})
export class LoginComponent {

  submitted = false;
  loading = false;

  loginForm!: FormGroup;

 constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
      lembrar: this.fb.nonNullable.control(true),
    });
  }

  async handleSubmit(): Promise<void> {
    console.log('logando...')
    try{
      await lastValueFrom(this.loginService.signIn(this.loginForm.value as ILogin));
      

         
      this.router.navigate(['/dashboard']);
    }catch(error){
      let erro = error as any;
      let mensagem = erro.error;
      console.log(mensagem);
      mensagem = "Usuário ou Senha Inválidos";
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao efetuar login',
        detail: mensagem,
      });

    }
  }

  get f() {
    return this.loginForm.controls;
  }
  

}
