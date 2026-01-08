import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from "primeng/button";
import { Dialog } from "primeng/dialog";
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-config-regras-form',
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ButtonModule, Dialog],
  templateUrl: './config-regras-form.component.html',
  styleUrl: './config-regras-form.component.scss',
})
export class ConfigRegrasFormComponent {

   @Input() dialog: boolean = false;
    @Input() submitted: boolean = false;
    @Input() regra: any = {};
    @Output() hideDialog = new EventEmitter<void>();
    @Output() salvar = new EventEmitter<void>();

    status: any[] = [
      { id: 1, nome: 'ATIVO', descricao: 'Ativo' }, 
      { id: 2, nome: 'INATIVO', descricao: 'Inativo' }
    ];

perfilOptions = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Usuário Normal', value: 'NORMAL' }
  ];

}
