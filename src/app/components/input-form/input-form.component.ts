import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import {sentMessage$} from '../../chat';
import {merge, Observable, Subject} from 'rxjs';
import {scan} from 'rxjs/operators';
import {Message} from '../../chat.service';
import {ChatService} from '../../chat.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  enteredMessage: string;
  sentMessage$: Subject<Message> = new Subject();
  @Output() sentMessage = new EventEmitter();


  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
  }

  emitMessage() {
    if (this.enteredMessage.length > 0) {
      this.chatService.sendMessageFromUser(new Message('user', this.enteredMessage, this.chatService.nameOfActiveBot));
    }
    // this.sentMessage$.next(new Message('user', this.enteredMessage));
    // this.sentMessage.emit(this.sentMessage$);
    this.enteredMessage = '';
    // this.chatService.results();
  }
}
