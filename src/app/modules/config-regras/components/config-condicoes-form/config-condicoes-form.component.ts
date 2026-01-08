import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { Dialog } from "primeng/dialog";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from "primeng/select";
import { Toolbar } from 'primeng/toolbar';


@Component({
  selector: 'app-config-condicoes-form',
  standalone:true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule, TableModule, Dialog,
    SelectModule,
    Toolbar
],
  templateUrl: './config-condicoes-form.component.html',
  styleUrl: './config-condicoes-form.component.scss',
})
export class ConfigCondicoesFormComponent {

  @Input() dialogCondicoes: boolean = false;
    @Input() colunasXml: any[] = [];
    @Input() regraCondicoes: any[] = [];
    @Output() hideDialogCondicoes  = new EventEmitter<void>();
    @Output() adicionar = new EventEmitter<any>();
    @Output() remover = new EventEmitter<void>();
    
    selectedColuna: any = {};
    valorInformado: String = "";
    condicaoInformada: String = "IGUAL";
    condicoes = [
        { id: 1, nome: 'IGUAL', descricao: 'Igual' }, 
        { id: 2, nome: 'DIFERENTE', descricao: 'Diferente' },
        { id: 3, nome: 'CONTIDO', descricao: 'Contido' }];
items: any;

    onAdicionarClick() {
         var param = { 
            caminho:    this.selectedColuna.caminho,
            condicao:  this.condicaoInformada,
            valorInformado: this.valorInformado
         }

         this.adicionar.emit(param);
         this.condicaoInformada = "IGUAL";
         this.valorInformado = "";
    }

}
