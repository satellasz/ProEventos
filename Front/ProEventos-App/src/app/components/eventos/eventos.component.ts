import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;

  public eventos: Evento[] = []
  public eventosFiltrados: Evento[] = []

  public widthImg: number = 125
  public marginImg: number = 2
  public isCollapsed: boolean = false

  private _filtroLista: string = ''

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  public ngOnInit(): void {
    this.spinner.show()

    this.getEventos()
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

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos,
        this.eventosFiltrados = this.eventos
      },
      error: () => {
        this.spinner.hide
        this.toastr.error('Erro ao carregar os eventos', 'Erro')
      },
      complete: () => this.spinner.hide(),
    })
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  public confirm(): void {
    this.modalRef?.hide()
    this.toastr.success('O evento foi deletado com sucesso!', 'Deletado')
  }

  public decline(): void {
    this.modalRef?.hide()
  }
}
