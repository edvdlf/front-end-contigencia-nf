import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { RecuperaSenhaComponent } from './auth/gestao-senha/recupera-senha/recupera-senha.component';
import { RedefinirSenhaComponent } from './auth/gestao-senha/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'recuperar-senha',
    component: RecuperaSenhaComponent,
  },

  {
    path: 'redefinir-senha',
    component: RedefinirSenhaComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'grupo',
        loadChildren: () =>
          import('./modules/cadastros/grupo/grupo.routes')
            .then(m => m.GRUPO_ROUTES),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./modules/cadastros/usuario/usuario.routes')
            .then(m => m.USUARIO_ROUTES),
      },
      {
        path: 'chamado',
        loadChildren: () =>
          import('./modules/chamado/chamado.routes')
            .then(m => m.CHAMADO_ROUTES),
      },
      {
        path: 'alterar-senha',
        loadChildren: () =>
          import('./auth/gestao-senha/altera-senha/altera-senha.routes')
            .then(m => m.ALTERA_SENHA_ROUTES),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
