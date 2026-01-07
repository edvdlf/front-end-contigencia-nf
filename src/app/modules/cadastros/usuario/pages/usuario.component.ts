import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioHeaderComponent } from "../components/usuario-header/usuario-header.component";

import { UsuarioService } from '../service/usuario-service';
import { ProgressSpinner } from "primeng/progressspinner";
import { CommonModule } from '@angular/common';
import { DeleteUsuarioAction, UsuarioRequest, UsuarioResponse } from '../models/usuario.model';
import { UsuarioTabsComponent } from "../components/usuario-tabs/usuario-tabs.component";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule,
    UsuarioHeaderComponent,
    UsuarioTabsComponent,


  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuarios: UsuarioResponse[] = [];
  loading = false;
  errorMsg = '';
  activeTab = '0';

  private readonly destroy$: Subject<void> = new Subject();
  private usuarioService = inject(UsuarioService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);



  ngOnInit(): void {
    
  }

  
  


  



    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }


  }
