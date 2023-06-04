import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'questions', loadChildren: () => import('src/question/question.module').then(m => m.QuestionModule) },
  { path: 'auth', loadChildren: () => import('src/auth/auth.module').then(m => m.AuthModule) },
  { path: 'tags', loadChildren: () => import('src/tag/tag.module').then(m => m.TagModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
