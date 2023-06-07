import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/model/question/Question';
import { Tag } from 'src/model/tag/Tag';
import { QuestionService } from 'src/service/question-service/question.service';
import { TagService } from 'src/service/tag-service/tag.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  question: Question = {};
  searchedTags: (string | undefined)[] = [];
  selectedTags: (string | undefined)[]= [];
  submitted: boolean = false;
  questionFormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl('', Validators.required),
    likes: new FormControl(0),
    dislikes: new FormControl(0),
    username: new FormControl(''),
    tags: new FormControl<any[]>([])
  });

  constructor(private questionService: QuestionService, 
              private tagService: TagService, 
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit(): void {
    if (this._route.snapshot.data["question"]) {
      this.question = {};
    }
    if (this._route.snapshot.data["question"]) {
      this.question = this._route.snapshot.data["question"][0];
      this.searchedTags = this._route.snapshot.data["question"][1];
      this.selectedTags = this._route.snapshot.data["question"][0]["tags"];
    }

    console.log(this._route.snapshot.data["tags"]);
    if (this._route.snapshot.data["tags"]) {
      this.searchedTags = this._route.snapshot.data["tags"];
    }

    this.initQuestion();
    //this.initTags();
  }

  initQuestion() {
    this.questionFormGroup.controls['title'].setValue(this.question.title ?? '');
    this.questionFormGroup.controls['description'].setValue(this.question.description ?? '');
    this.questionFormGroup.controls['likes'].setValue(this.question.likes ?? 0);
    this.questionFormGroup.controls['dislikes'].setValue(this.question.dislikes ?? 0);
    this.questionFormGroup.controls['username'].setValue(this.question.username ?? '');
    this.questionFormGroup.controls['tags'].setValue(<any>this.question.tags ?? []);
  }

  initTags() {
    this.tagService.getTags().subscribe(response => {
      this.searchedTags = response.map(t => t.name) ?? [];
      console.log('selected tags');
      console.log(this.questionFormGroup.controls['tags'].value);
      console.log(this.searchedTags);
      this.selectedTags = this.questionFormGroup.controls['tags'].value ?? [];
      this.searchedTags = this.searchedTags.filter(x => !this.selectedTags.includes(x));
    });
  }

  public onChangeSearchField(event: Event) {
    const searchString = (<HTMLInputElement>event.target).value;
    if (searchString.trim() == '') {
      this.initTags();
      return;
    }
    this.tagService.findTagsContaining(searchString).subscribe(response => {
        this.searchedTags = response.map(t => t.name);
        this.searchedTags = this.searchedTags.filter(x => !this.selectedTags.includes(x));
    });
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.questionFormGroup.markAllAsTouched();

    if (this.questionFormGroup.valid) {
    const question: Question = {
      id: this.question?.id ?? undefined,
      title: this.questionFormGroup.controls['title'].value ?? '',
      description: this.questionFormGroup.controls['description'].value ?? '',
      likes: this.questionFormGroup.controls['likes'].value ?? 0,
      dislikes: this.questionFormGroup.controls['dislikes'].value ?? 0,
      username: 'admin123',
      tags: this.selectedTags ?? this.questionFormGroup.controls['tags'].value ?? []
    };

    if (this.question.id) {
      this.questionService.updateQuestion(question).subscribe(response => {
        this._router.navigate(['/']);
      });
    } else {
      this.questionService.createQuestion(question).subscribe((response) => {
        this._router.navigate(['/']);
      });
    }
    }
  }
  
  removeTag(tag: string | undefined) {
    if (tag) {
      const removedTagIndex = this.selectedTags.indexOf(tag);
      this.searchedTags.push(tag);
      this.selectedTags.splice(removedTagIndex, 1);
    }
  }

  addTag(tag: string | undefined) {
    if (tag) {
      const addedTagIndex = this.searchedTags.indexOf(tag);
      this.selectedTags.push(tag);
      this.searchedTags.splice(addedTagIndex, 1);
    }
  }

}
