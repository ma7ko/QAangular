import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from 'src/model/tag/Tag';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent {

  tagName: string = '';
  @Output()
  addedTagEmitter: EventEmitter<Tag> = new EventEmitter<Tag>();

  public submitForm(event: Event) {
    event.preventDefault();

    console.log('form submitted');
    console.log(this.tagName);
    const tag: Tag = { name: this.tagName };
    this.addedTagEmitter.emit(tag);
  }
}
