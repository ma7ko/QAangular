import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    PaginationComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    PaginationComponent,
    NavigationComponent
  ]
})
export class SharedModule { }
