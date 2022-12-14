import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento
  form!: FormGroup

  estadoSalvar:string = 'post'

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService)
  {
    this.localeService.use('pt-br')
  }

  ngOnInit(): void {
    this.carregarEvento()
    this.validation()
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id')

    if (eventoIdParam !== null) {
      this.spinner.show()

      this.estadoSalvar = 'put'

      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = {...evento}
          this.form.patchValue(this.evento)
        },
        error: (error: any) => {
          this.spinner.hide()
          this.toastr.error("Erro ao tentar carregar evento.", "Erro")
          console.log(error)
        },
        complete: () => {
          this.spinner.hide()
        },
      })
    }
  }

  public salvarAlteracao(): void {
    this.spinner.show()
    if (this.form.valid) {
      this.evento = this.estadoSalvar === 'post'
        ? { ...this.form.value }
        : { id: this.evento.id, ...this.form.value }

      this.eventoService[this.estadoSalvar](this.evento).subscribe({
        next: () => {
          this.toastr.success('Evento salvo com sucesso!', 'Sucesso')
        },
        error: (error: any) => {
          console.error(error)
          this.spinner.hide()
          this.toastr.error('Erro ao salvar evento', 'Erro')
        },
        complete: () => {
          this.spinner.hide()
        }
      })
    }
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'dd/MM/YYYY hh:mm a',
      isAnimated: true,
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  get f(): any {
    return this.form.controls
  }

  public validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.ValidDate('dataEvento')
    }

    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, formOptions)
  }

  public resetForm(): void {
    this.form.reset()
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched }
  }
}
