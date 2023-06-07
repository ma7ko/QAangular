import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input()
  modalID: string = 'id';

  @Input()
  title: string = 'Modal Title';

  @Input()
  modalBodyText: string = 'Modal Body Text';

  @Input()
  cancelButtonText: string = 'Cancel';

  @Input()
  confirmButtonText: string = 'Confirm';

  @Output()
  emitSubmitted = new EventEmitter<boolean>();

  submitClicked = false;

  submitted(event: Event) {
    this.submitClicked = true;
    this.emitSubmitted.emit(true);
  }
}
