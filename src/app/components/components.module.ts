import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    SharedModule,

    RouterModule.forChild([
      { path: 'auth', component: AuthComponent }
    ])
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
