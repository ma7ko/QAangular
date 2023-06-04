import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionResolverService } from 'src/service/resolvers/question-resolver.service';
import { QuestionDetailsResolverService } from 'src/service/resolvers/question-details-resolver.service';

const routes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'details/:id', component: QuestionDetailsComponent, resolve: { questionDetails: QuestionDetailsResolverService }, loadChildren: () => import('src/answer/answer.module').then(m => m.AnswerModule)  },
  { path: 'create', component: QuestionFormComponent },
  { path: 'edit/:id', component: QuestionFormComponent, resolve: { question: QuestionResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
