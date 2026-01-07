import { Component } from '@angular/core';

@Component({
  selector: 'app-chamado-header',
  imports: [],
   template:`
<div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Chamados</h2>
        <p class="subtitle">
          Gerencie os chamados registrados no sistema.
        </p>
      </div>

</div>
  `
})
export class ChamadoHeaderComponent {

}
