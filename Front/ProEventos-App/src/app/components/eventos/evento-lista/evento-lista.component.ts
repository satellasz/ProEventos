import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef;

  public eventos: Evento[] = []
  public eventosFiltrados: Evento[] = []
  public eventoId: number = 0

  public widthImg: number = 125
  public marginImg: number = 2
  public isCollapsed: boolean = false

  private _filtroLista: string = ''

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit(): void {
    this.spinner.show()

    this.carregarEventos()
  }

  public get filtroLista(): string {
    return this._filtroLista
  }

  public set filtroLista(value: string) {
    this._filtroLista = value
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.eventos.filter(
      (evento: { tema: string; local: string }) =>
      evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  public alterarImagem(): void {
    this.isCollapsed = !this.isCollapsed
  }

  public carregarEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos,
        this.eventosFiltrados = this.eventos
      },
      error: () => {
        this.spinner.hide()
        this.toastr.error('Erro ao carregar os eventos', 'Erro')
      },
      complete: () => this.spinner.hide(),
    })
  }

  public openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation()
    this.eventoId = eventoId
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public confirm(): void {
    this.modalRef?.hide()
    this.spinner.show()

    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: () => {
          this.toastr.success('O evento foi deletado com sucesso!', 'Deletado')
          this.carregarEventos()
      },
      error: (error: any) => {
        console.error(error)
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro')
      }
    }).add(() => this.spinner.hide())
  }

  public decline(): void {
    this.modalRef?.hide()
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`])
  }

}
