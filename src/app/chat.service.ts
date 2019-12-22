import {Injectable} from '@angular/core';
import {merge, Observable, pipe, Subject} from 'rxjs';
import {scan} from 'rxjs/operators';

export class Message {
  constructor(public sender: string, public text: string, public recipient: string) {
  }
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  constructor() {
    this.messagesFromCurrentChat$ = new Observable<Message[]>();

    this.sentMessage$ = new Subject<Message>();
    this.incomingMessage$ = new Subject<Message>();
    this.newMessage$ = merge<Message>(this.sentMessage$, this.incomingMessage$);
    this.messages$ = this.newMessage$.pipe(
      scan((messages: any, m) => [...messages, m], []));
    this.messages$.subscribe((message: Message[]) => {
      this.messagesFromCurrentChat = [];
      message.forEach(m => {
          if (m.recipient === this.nameOfActiveBot || (m.recipient === 'user' && m.sender === this.nameOfActiveBot)) {
            this.messagesFromCurrentChat.push(m);
          }
        }
      );
    });
  }

  messagesFromCurrentChat$: Observable<Message[]>;
  messagesFromCurrentChat: Message[] = [];
  nameOfActiveBot: string;
  messages: Message[] = [];
  sentMessage$;
  incomingMessage$;

  newMessage$;

  messages$: Observable<Message[]>;

  sendMessageFromUser(newMessage: Message) {
    this.sentMessage$.next(newMessage);
    this.newMessage$ = merge<Message>(this.sentMessage$, this.incomingMessage$);
    this.messages$ = this.newMessage$.pipe(
      scan((messages: any, m) => [...messages, m], []));
  }

  sendMessageFromBot(newMessage: Message) {
    this.incomingMessage$.next(newMessage);
    this.newMessage$ = merge<Message>(this.sentMessage$, this.incomingMessage$);
    this.messages$ = this.newMessage$.pipe(
      scan((messages: any, m) => [...messages, m], []));
  }

  emulateChange() {
    this.sentMessage$.next(this.sentMessage$);
  }

  getAllMessages(): Message[] {
    return this.messages;
  }
}
