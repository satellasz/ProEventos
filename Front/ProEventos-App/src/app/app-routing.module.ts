import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// General
import { PalestrantesComponent } from '@app/components/palestrantes/palestrantes.component';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';
import { ContatosComponent } from '@app/components/contatos/contatos.component';
import { PerfilComponent } from '@app/components/perfil/perfil.component';

// Evento related
import { EventosComponent } from '@app/components/eventos/eventos.component';
import { EventoDetalheComponent } from '@app/components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from '@app/components/eventos/evento-lista/evento-lista.component';

// User related
import { UserComponent } from '@app/components/user/user.component';
import { LoginComponent } from '@app/components/user/login/login.component';
import { RegistrationComponent } from '@app/components/user/registration/registration.component';

const routes: Routes = [
  { path: 'eventos', redirectTo: 'eventos/lista'},
  {
    path: 'eventos', component: EventosComponent,
    children: [
      { path: 'detalhe/:id', component: EventoDetalheComponent },
      { path: 'detalhe', component: EventoDetalheComponent },
      { path: 'lista', component: EventoListaComponent },
    ]
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent},
    ]
  },
  { path: 'user/perfil', component: PerfilComponent },
  { path: 'palestrantes', component: PalestrantesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
