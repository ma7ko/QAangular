import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionService } from '../question-service/question.service';
import { AnswerService } from '../answer-service/answer.service';
import { PageableItem } from './payload/pageable-item';
import { from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageableService {

  constructor(private _questionService: QuestionService,
              private _answerService: AnswerService) { }

  currentPage: number = 0;
  pageableItem: PageableItem = {};

  changePage(value: number, route: string, questionId?: number) {
    if (this.currentPage != value || this.currentPage == 0) {
     this.pageableItem = {};
     this.getPage(value, route, questionId);
    }
    return this.pageableItem;
  }

  async getPage(page: number, route: string, questionId?: number) {
    switch(route) {
      case 'question':
        const questionResult = await lastValueFrom(this._questionService.listQuestions(page));
        this.pageableItem = questionResult;
        break;
      case 'answer':
        const answerResult = await lastValueFrom(this._answerService.findAnswersByQuestionId(questionId ?? 0, page));
        this.pageableItem = answerResult;
        break;
    }
  }

  getPageableItem() {
    return this.pageableItem;
  }

}
