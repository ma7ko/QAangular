import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    PaginationComponent,
    NavigationComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    PaginationComponent,
    NavigationComponent,
    ModalComponent
  ]
})
export class SharedModule { }
