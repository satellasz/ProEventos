import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

// Pipes
import { DateTimeFormatPipe } from '@app/helpers/DateTimeFormat.pipe';

// General
import { PalestrantesComponent } from '@app/components/palestrantes/palestrantes.component';
import { ContatosComponent } from '@app/components/contatos/contatos.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { PerfilComponent } from '@app/components/perfil/perfil.component';
import { TituloComponent } from '@app/shared/titulo/titulo.component';
import { NavComponent } from '@app/shared/nav/nav.component';

// Evento related
import { EventosComponent } from '@app/components/eventos/eventos.component';
import { EventoService } from '@app/services/evento.service';
import { EventoDetalheComponent } from '@app/components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from '@app/components/eventos/evento-lista/evento-lista.component';

// User related
import { UserComponent } from '@app/components/user/user.component';
import { LoginComponent } from '@app/components/user/login/login.component';
import { RegistrationComponent } from '@app/components/user/registration/registration.component';

defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipe,
    EventoDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [EventoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
