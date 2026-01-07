import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { Card } from "primeng/card";

@Component({
  selector: 'app-grupo-table',
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    TableModule,
    Card
],
  templateUrl: './grupo-table.component.html',
  styleUrl: './grupo-table.component.scss',
})
export class GrupoTableComponent {



  getStatusText(enabled: boolean): string {
    return enabled ? 'Sim' : 'Não';
  }

  getStatusColor(enabled: boolean): string {
    return enabled ? '#006400' : '#FF0000';
  }

}
