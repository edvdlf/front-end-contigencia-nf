import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { ILogin, IResetSenha } from '../models/login.model';


const AUTH_ENDPOINT = `${environment.auth}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isBrowser: Boolean | undefined;

  private readonly ACCESS_TOKEN_KEY = '@plataformaContigencia:access_token';
  private readonly ACCESS_TOKEN_KEY_AVATAX = '@acelerador_avatax:access_token';
  public readonly ACCESS_TOKEN_KEY_ACELERADOR_TCO = '@PortalProjo:access_token';
  private readonly REFRESH_TOKEN_KEY = '@plataformaContigencia:refresh_token';
  private jwtHelper = new JwtHelperService();

constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isAuthenticated(): boolean {
    return true;
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isFirstAccess(): boolean {
    const token: any = this.jwtHelper.decodeToken(this.getToken()!) as any;

    const { user_first_access } = token;

    return user_first_access;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return window.sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    } else {
      return null;
    }
  }

  signIn(login: ILogin) {
    return this._http.post(AUTH_ENDPOINT + '/usuarios/login', login, { responseType: 'text' as const })
      .pipe(
        tap(response => {
          const token: string = response as unknown as string;

          window.sessionStorage.setItem("usuarioLogin", login.usuario);
          this.initializeSession(JSON.parse(token).token);
        }),
        map(response => response as unknown as string)
      );
  }

  resetSenha(reset: IResetSenha) {
    return this._http.post(AUTH_ENDPOINT + '/usuarios/solicitar/reset-senha', reset, { responseType: 'text' as const });
  }

  redefinirSenha(token: string, novaSenha: string | null | undefined) {
    return this._http.post(AUTH_ENDPOINT + '/usuarios/redefinir-senha', {
      token: token,
      novaSenha: novaSenha
    }, { responseType: 'text' as const })
  }

  getVersion(): Observable<string> {
    return this._http.get<string>(AUTH_ENDPOINT + '/security/login/version');
  }

  obterUsuarioNome(): string | null {

    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.usuarioNome || null;
    }
    return null;
  }

  obterAmbienteLogado(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log('Token decodificado:', decodedToken);
      console.log('Ambiente do usuário:', decodedToken.ambiente);
      return decodedToken.ambiente || null;
    }
    return null;
  }

  obterGruposUsuario(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.sub || [];
    }
    return [];
  }

  obterAplicativos(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.APLICATIVOS || [];
    }
    return [];
  }

  obterPermissoes(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.PERMISSOES || [];
    }
    return [];
  }

  initializeSession(accessToken: any) {
    window.sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    window.sessionStorage.setItem(this.ACCESS_TOKEN_KEY_AVATAX, accessToken);
    window.sessionStorage.setItem(this.ACCESS_TOKEN_KEY_ACELERADOR_TCO, accessToken);
  }

  destroySession = (): void => {
    window.sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }


}

