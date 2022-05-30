import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule //para usarr o routerlink na navbar
  ],
  exports: [// São os componentes pipes
    NavbarComponent
  ]
})
export class CoreModule { }

/**
 * Guardar elementos do contexto global como serviços, navabar, models e etc.
 */
