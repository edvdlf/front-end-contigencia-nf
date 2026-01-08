import { Component } from '@angular/core';

@Component({
  selector: 'app-config-regras-header',
  imports: [],
   template:`
<div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Regras</h2>
        <p class="subtitle">
          Nessa funcionalidade é possível realizar a configuração das regras de definição da Class. Trib. e CST
                a partir de dados do documento eletrônico recebido.
        </p>
      </div>

</div>
  `
})
export class ConfigRegrasHeaderComponent {

}
