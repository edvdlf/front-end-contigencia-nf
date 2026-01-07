import { Injectable, computed, effect, inject, signal } from '@angular/core';


/** Estrutura do item de menu */
export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  externalUrl?: string;
  badge?: number | string;
  children?: MenuItem[];
  permission?: string | string[];
  separator?: boolean;
  target?: string;
  testId?: string;
}

export type PerfilUsuario = 'ADMIN' | 'NORMAL';

const USUARIO_NORMAL_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
    testId: 'menu-dashboard',
  },

   {
    label: 'Chamados',
    icon: 'pi pi-users',
    route: '/chamado',
    testId: 'menu-chamados',
  },

  {
    label: 'Regras',
    icon: 'pi pi-users',
    route: '/regras',
    testId: 'menu-regras',
  },

 
  {
    label: 'Ajuda',
    icon: 'pi pi-book',
    externalUrl: '/help/html/VisaoGeral.html',
    target: '_blank',
    testId: 'menu-ajuda',
  },
];

const USUARIO_ADMIN_MENU: MenuItem[] = [
 {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
   testId: 'menu-dashboard',
  },
  
  {
    label: 'Gestão de Usuários',
    icon: 'pi pi-user-edit',
    testId: 'menu-gestao-usuarios',
    children: [
      {
        label: 'Grupo',
        icon: 'pi pi-users',
        route: '/grupo',
        testId: 'menu-grupos',
      },
      {
        label: 'Usuário',
        icon: 'pi pi-user',
        route: '/usuario',
        testId: 'menu-usuario',
      },
    ],
  },

  {
    label: 'Chamados',
    icon: 'pi pi-users',
    route: '/chamado',
    testId: 'menu-chamados',
  },

 


  {
    label: 'Ajuda',
    icon: 'pi pi-book',
    externalUrl: '/help/html/VisaoGeral.html',
    target: '_blank',
    testId: 'menu-ajuda',
  },
];



@Injectable({ providedIn: 'root' })
export class MenuService {
  //private readonly auth = inject(AuthService);

  // guarda o menu “base” escolhido pelo perfil (antes de filtrar permissões)
  private readonly _baseItems = signal<MenuItem[]>([]);

  // menu final (após permissões)
  private readonly _items = signal<MenuItem[]>([]);

  /** leitura reativa do menu */
  readonly items = computed(() => this._items());

  constructor() {
    // reage automaticamente ao perfil/roles do usuário logado
    effect(() => {
      //const perfil = this.auth.perfil();     // 'ADMIN' | 'NORMAL'
      //const roles = this.auth.roles();       // string[] (no seu caso pode ser ['ADMIN'] ou ['NORMAL'])

      //const base = this.getMenuByPerfil(perfil);
      //const finalMenu = this.applyPermissionsOn(base, roles);

      //this._baseItems.set(base);
      //this._items.set(finalMenu);
    });
  }

  private getMenuByPerfil(perfil: PerfilUsuario): MenuItem[] {
    return perfil === 'ADMIN' ? USUARIO_ADMIN_MENU : USUARIO_NORMAL_MENU;
  }

  /** Opcional: permite forçar um menu manualmente */
  setItems(items: MenuItem[]) {
    this._baseItems.set(items ?? []);
    this._items.set(items ?? []);
  }

  /** Opcional: adiciona itens no menu atual */
  addItems(...items: MenuItem[]) {
    this._items.update(curr => [...curr, ...items]);
  }

  /** Filtra permissões SEM mutar o menu original */
  private applyPermissionsOn(list: MenuItem[], userRoles: string[] = []): MenuItem[] {
    const allow = (perm?: string | string[]) => {
      if (!perm) return true;
      const required = Array.isArray(perm) ? perm : [perm];
      return required.some(r => userRoles.includes(r));
    };

    const deep = (items: MenuItem[]): MenuItem[] =>
      items
        .filter(i => allow(i.permission))
        .map(i => ({ ...i, children: i.children ? deep(i.children) : undefined }))
        .filter(i => i.route || i.externalUrl || i.children?.length || i.separator);

    return deep(list);
  }

  /** Se quiser reaplicar permissões manualmente (opcional) */
  refreshPermissions() {
    const roles: string[] | undefined = [];
    this._items.set(this.applyPermissionsOn(this._baseItems(), roles));
  }
}
