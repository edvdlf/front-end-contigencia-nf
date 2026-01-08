import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { StatusUsuario } from '../../models/config-regras.model';

@Component({
  selector: 'app-config-regras-table',
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    CardModule,
    TableModule
],
  templateUrl: './config-regras-table.component.html',
  styleUrl: './config-regras-table.component.scss',
})
export class ConfigRegrasTableComponent {


  @Input() regras: any[] = [];
  @Input() @Output() regra = {};
  @Input() @Output() dialog: boolean = false;
  @Output() editar = new EventEmitter<void>();
  @Output() excluir = new EventEmitter<void>();
  @Output() condicoes = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();


  getStatusText(status: StatusUsuario): string {
  return status;
}

getStatusColor(status: StatusUsuario): string {
  return status === 'ATIVO' ? '#006400' : '#FF0000';
}

exportExcel(): void {
    if (!this.regras?.length) return;

    // Lazy import (não pesa o bundle inicial)
    Promise.all([import('xlsx'), import('file-saver')]).then(([xlsx, fileSaver]) => {
      const rows = this.regras.map(r => ({
        Id: r.id,
        Ordem: r.ordem,
        Descrição: r.descricao,
        Data: r.dataFormatada, // ou formate aqui se vier Date
        'Classificação Tributária': r.classTrib,
        CST: r.cst,
        Status: this.getStatusText(r.status),
      }));
       const worksheet = xlsx.utils.json_to_sheet(rows);
      const workbook = { Sheets: { Regras: worksheet }, SheetNames: ['Regras'] };

      const excelBuffer: ArrayBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });

      const fileName = `regras_${new Date().toISOString().slice(0, 10)}.xlsx`;
      fileSaver.saveAs(blob, fileName);
    });
  }

}
