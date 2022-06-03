import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

//Configura uma guarda para redirecionar o usuario para login, caso ele não eseteja logado
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login'])


const routes: Routes = [
  {
    path: '',
    redirectTo: 'diarios',
    pathMatch: 'full',
  },
  {
    path: 'diarios', component: DiarioListComponent, // Os tres ponto é paradizer que o objeto será gerado dentro do path
    ...canActivate(redirectUnauthorizedToLogin), // Só pode acessar a rota se estiver logado
  },
  //Essa rota abaixo é dinâmica
  { path: 'diarios/:id', component: DiarioDetailComponent, // Os tres ponto é paradizer que o objeto será gerado dentro do path
  ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiariosRoutingModule { }
