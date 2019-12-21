import {Component} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {scan, tap} from 'rxjs/operators';
import {ChatService, Message} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public chatService: ChatService) {

  }

  title = 'Chat with bots';
  sentMessage$: Subject<Message> = new Subject();
  incomingMessage$: Subject<Message> = new Subject();

  newMessage$ = merge<Message>(this.chatService.sentMessage$, this.incomingMessage$);

  messages$: Observable<Message[]> = this.chatService.newMessage$.pipe(
    scan((messages: any, m) => [...messages, m], [])
  );

  getEnteredMessage(enteredMessage$: Subject<Message>) {
    this.newMessage$.subscribe(c => console.log('+  ' + c));
    enteredMessage$.forEach((c: Message) => console.log('getEntered  ' + c.text));
    this.newMessage$.forEach((c: Message) => console.log('getEntered2  ' + c.text));
    this.newMessage$ = merge<Message>(this.sentMessage$, enteredMessage$);
    this.messages$ = this.newMessage$.pipe(
      scan((messages: any, m) => [...messages, m], [])
    );
    this.messages$.forEach(c => console.log(c));
  }

  getIncomingMessage(incomingMessage$: Subject<Message>) {
    this.newMessage$ = merge<Message>(this.chatService.sentMessage$, incomingMessage$);
    this.messages$ = this.newMessage$.pipe(
      scan((messages: any, m) => [...messages, m], [])
    );
    this.messages$.forEach(c => console.log(c));
  }
}
