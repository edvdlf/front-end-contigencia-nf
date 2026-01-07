import { Component } from '@angular/core';

@Component({
  selector: 'app-grupo-header',
  imports: [],
   template:`
<div
      class="custom-card header-band flex align-items-center justify-content-between"
    >
      <div class="text-group">
        <h2 class="title">Grupos de usuários</h2>
        <p class="subtitle">
          Crie, atualize ou exclua os grupos de usuários.
        </p>
      </div>

</div>
  `
})
export class GrupoHeaderComponent {

}
