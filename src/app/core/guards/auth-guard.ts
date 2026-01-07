import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';
import { LoginService } from '../../auth/login/login.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  console.log('URL: ', state.url);
  if (authService.isAuthenticated()) {
    if (state.url === '/aplicativos' || 
        state.url.match('/chamados') || 
        state.url.match('/comentarios'))
      return true;
    
    if (authService.obterPermissoes().includes('ROLE_DEFAULT') && 
       (state.url === '/upload' || 
        state.url === '/config-regras'))
      return true;

    if ((state.url === '/usuarios' ||
      state.url === '/upload' || 
      state.url === '/config-regras')
      && (authService.obterPermissoes().includes('ROLE_SUPERUSER'))) 
      return true;
    
    if ((state.url === '/usuarios' || 
      state.url === '/grupos') 
      && (authService.obterPermissoes().includes('ROLE_ADMINISTRATOR'))) 
      return true;
    
    return router.createUrlTree(['/acesso-negado'])  
  }
  else{
    return router.createUrlTree(['/'])
  }
  
}
