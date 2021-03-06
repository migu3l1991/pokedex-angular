import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountFormComponent } from './components/account-form/account-form.component';

import { AccountPageRoutingModule } from './account-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountPageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  declarations: [AccountFormComponent]
})
export class AccountPageModule {}
