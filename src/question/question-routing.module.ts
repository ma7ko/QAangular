import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionResolverService } from 'src/service/resolvers/question-resolver.service';
import { QuestionDetailsResolverService } from 'src/service/resolvers/question-details-resolver.service';
import { questionDetailsResolver } from 'src/service/resolvers/question-details-functional-resolver';
import { questionResolver } from 'src/service/resolvers/question-functional-resolver';
import { authGuard } from 'src/service/guards/auth/auth.guard';
import { tagResolver } from 'src/service/resolvers/tag-functional-resolver';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'details/:id', component: QuestionDetailsComponent, resolve: { questionDetails: questionDetailsResolver }, canActivate: [authGuard], loadChildren: () => import('src/answer/answer.module').then(m => m.AnswerModule)  },
  { path: 'create', component: QuestionFormComponent, resolve: { tags: tagResolver }, canActivate: [authGuard] },
  { path: 'edit/:id', component: QuestionFormComponent, resolve: { question: questionResolver }, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
