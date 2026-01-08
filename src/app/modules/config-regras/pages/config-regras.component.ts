import { Component } from '@angular/core';
import { ConfigRegrasHeaderComponent } from "../components/config-regras-header/config-regras-header.component";
import { ConfigRegrasTableComponent } from "../components/config-regras-table/config-regras-table.component";
import { ConfigRegrasService } from '../service/config-regras-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ConfigRegrasFormComponent } from "../components/config-regras-form/config-regras-form.component";
import { ConfigCondicoesFormComponent } from "../components/config-condicoes-form/config-condicoes-form.component";

@Component({
  selector: 'app-config-regras',
  imports: [ConfigRegrasHeaderComponent, ConfigRegrasTableComponent, ConfigRegrasFormComponent, ConfigCondicoesFormComponent],
  templateUrl: './config-regras.component.html',
  styleUrl: './config-regras.component.scss',
})
export class ConfigRegrasComponent {


  regras: any[] = [];
    regraCondicoes: any[] = [];
    colunasXml: any[] = [];
    regra: any = {};
    regraCondicao: any = {};

    lifeMessageToast: number = 5_000;
    dialog: boolean = false;
    dialogCondicoes: boolean = false;
    submitted: boolean = false;

    constructor(
        private service: ConfigRegrasService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.fetchContent();
        this.fetchContentColunas();
        this.dialog = false;
    }

    public fetchContentCondicoes(): void {
        this.service.listaCondicoes(this.regra).subscribe({
            next: (payload) => {
                this.regraCondicoes = payload;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Regras',
                    detail: 'Erro ao tentar buscar lista de condições',
                    life: this.lifeMessageToast,
                });
                console.error('Erro: ' + error);
            },
        });
    }

    public fetchContentColunas(): void {
        this.service.listarColunas().subscribe({
            next: (payload) => {
                this.colunasXml = payload;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Regras',
                    detail: 'Erro ao tentar buscar lista de colunas',
                    life: this.lifeMessageToast,
                });
                console.error('Erro: ' + error);
            },
        });
    }

    public fetchContent(): void {
        //if (!this.auth.isAuthenticated())
        // return;
        this.service.listar().subscribe({
            next: (payload) => {
                this.regras = payload;
            },
            error: (error: HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Regras',
                    detail: 'Erro ao tentar buscar lista de regras',
                    life: this.lifeMessageToast,
                });
                console.error('Erro: ' + error);
            },
        });
    }

    add() {
        this.dialog = true;
        this.regra = {
            ordem: 1,
            status: "ATIVO",
            classTrib: "000001",
            cst: "000"
        };
    }

    editar(regra: any) {
       
        this.regra = {...regra};     
        this.dialog = true;
         
    }

    hideDialog() {
        this.dialog = false;
    }

    salvar() {
        this.submitted = true;
        try {
            this.service.salvar(this.regra)
                .pipe(
                    catchError(error => {
                        console.error('Erro ao salvar a regra: ', error);
                        if (!error.error.error)
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Regra',
                                detail: 'Erro ao salvar regra. ' + error.error,
                                life: this.lifeMessageToast,
                            });
                        return throwError(error);
                    }))
                .subscribe((response) => {
                    this.fetchContent();
                    this.dialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Regra',
                        detail: 'Regra salva com sucesso!',
                        life: this.lifeMessageToast,
                    });
                });
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Regra',
                detail: 'Erro ao tentar salvar a regra!',
                life: this.lifeMessageToast,
            });
        }
    }

    excluir(regra: any) {
        this.regra = {...regra};   

        this.confirmationService.confirm({
            header: 'Confirmação',
            message: 'Tem certeza que deseja deletar?',
            icon: 'pi pi-exclamation-triangle',
            blockScroll: true,
            dismissableMask: true,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptVisible: true,
            closeOnEscape: true,
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-contrast',
            accept: () => {
                this.service.deletar(this.regra)
                    .toPromise()
                    .then((response) => {
                        this.fetchContent();
                    });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Regra',
                    detail: 'Regra excluída com sucesso!',
                    life: this.lifeMessageToast,
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Regra',
                    detail: 'Exclusão da Regra cancelada!',
                    life: this.lifeMessageToast,
                });
            }
        });
    }

    condicoes(regra: any) {
        console.log("Condicoes");
        this.regra = {...regra}; 
        this.fetchContentCondicoes();  
        this.dialogCondicoes = true;
    }

    hideDialogCondicoes() {
        console.log("hideDialogCondicoes");
        this.dialogCondicoes = false;
    }

    adicionarCondicao(
        params: any) {

        console.log("Adicionar Condicao");        
        this.regraCondicao = {};
        this.regraCondicao.regra = this.regra;
        this.regraCondicao.caminhoXml = params.caminho;
        this.regraCondicao.condicao = params.condicao;
        this.regraCondicao.valorInformado = params.valorInformado;

        console.log(this.regraCondicao);
        try {
            this.service.salvarCondicao(this.regraCondicao)
                .pipe(
                    catchError(error => {
                        console.error('Erro ao salvar a condição: ', error);
                        if (!error.error.error)
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Regra',
                                detail: 'Erro ao salvar condição. ' + error.error,
                                life: this.lifeMessageToast,
                            });
                        return throwError(error);
                    }))
                .subscribe((response) => {
                    this.fetchContentCondicoes();
                    this.dialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Regra',
                        detail: 'Condição salva com sucesso!',
                        life: this.lifeMessageToast,
                    });
                });
        } catch (error) {
            this.messageService.add({
                severity: 'error',
                summary: 'Regra',
                detail: 'Erro ao tentar salvar a condição!',
                life: this.lifeMessageToast,
            });
        }
    }

    removerCondicao(condicao: any) {
        this.confirmationService.confirm({
            header: 'Confirmação',
            message: 'Tem certeza que deseja deletar?',
            icon: 'pi pi-exclamation-triangle',
            blockScroll: true,
            dismissableMask: true,
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            acceptVisible: true,
            closeOnEscape: true,
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-contrast',
            accept: () => {
                this.service.deletarCondicao(condicao)
                    .toPromise()
                    .then((response) => {
                        this.fetchContentCondicoes();
                    });
                this.messageService.add({
                    severity: 'success',
                    summary: 'Regra',
                    detail: 'Condição excluída com sucesso!',
                    life: this.lifeMessageToast,
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Regra',
                    detail: 'Exclusão da Condição cancelada!',
                    life: this.lifeMessageToast,
                });
            }
        });
    }

}
