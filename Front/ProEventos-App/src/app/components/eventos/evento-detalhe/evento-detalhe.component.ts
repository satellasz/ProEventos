import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation()
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
}
