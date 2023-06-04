import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/model/tag/Tag';
import { TagService } from 'src/service/tag-service/tag.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit, OnDestroy {

  tags: Tag[] = [];
  tagsSubscription: Subscription = new Subscription();

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.tagsSubscription = this.tagService.getTags().subscribe(response => {
      this.tags = response;
    });
  }

  public saveTag(tag: any) {
    console.log(tag);
    this.tagService.addTag(tag).subscribe(response => {
      console.log('Successfully added tag');
    });
  }

  public showDeleteIcon(event: Event) {
    const tag = <HTMLElement>event.target;
    tag.classList.add('text-light');
  }

  public hideDeleteIcon(event: Event) {
    const tag = <HTMLElement>event.target;
    tag.classList.remove('text-light');
  }

  public deleteTag(event: Event) {
    const tagID = (<HTMLElement>event.target).getAttribute('id');
    if (tagID) {
      this.tagService.deleteTag(parseInt(tagID)).subscribe(response => {
        console.log('Successfully deleted tag');
      });
    }
  }

  ngOnDestroy(): void {
    this.tagsSubscription.unsubscribe();
  }

}
