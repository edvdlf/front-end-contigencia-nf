import { Component } from '@angular/core';
import { GrupoHeaderComponent } from "../components/grupo-header/grupo-header.component";
import { GrupoTableComponent } from "../components/grupo-table/grupo-table.component";

@Component({
  selector: 'app-grupo',
  imports: [GrupoHeaderComponent, GrupoTableComponent],
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.scss',
})
export class GrupoComponent {

}
