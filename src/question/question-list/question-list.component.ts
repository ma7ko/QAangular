import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/model/question/Question';
import { PageableService } from 'src/service/pageable-service/pageable.service';
import { PageableItem } from 'src/service/pageable-service/payload/pageable-item';
import { QuestionService } from 'src/service/question-service/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

    @ViewChild('pagination') paginationComponent: any;
    questionList: Question[] = [];
    pageableItem: PageableItem = {};

    constructor(private questionService: QuestionService, 
                private _pageableService: PageableService) {}

    ngOnInit() {
      this.getItems(0);
    }

    async getItems(page: number) {
      await this._pageableService.getPage(page, 'question');
      this.pageableItem = this._pageableService.getPageableItem();
      console.log(this.pageableItem);
    } 

    reloadList(event: boolean) {
      this.getItems(this.paginationComponent.page);
    }

    changePage(event: number) {
      this.getItems(event);
    }

    deleteQuestion(event: any) {
      console.log(event);
    } 


}
