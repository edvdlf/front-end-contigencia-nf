import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-chamado-table',
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    CardModule,
    TableModule
],
  templateUrl: './chamado-table.component.html',
  styleUrl: './chamado-table.component.scss',
})
export class ChamadoTableComponent {

  getStatusText(enabled: boolean): string {
    return enabled ? 'Sim' : 'Não';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? '#006400' : '#FF0000';
  }

}
