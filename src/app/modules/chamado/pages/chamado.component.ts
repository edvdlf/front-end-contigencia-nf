import { Component } from '@angular/core';
import { ChamadoHeaderComponent } from "../components/chamado-header/chamado-header.component";
import { ChamadoTableComponent } from "../components/chamado-table/chamado-table.component";

@Component({
  selector: 'app-chamado',
  imports: [ChamadoHeaderComponent, ChamadoTableComponent],
  templateUrl: './chamado.component.html',
  styleUrl: './chamado.component.scss',
})
export class ChamadoComponent {

}
