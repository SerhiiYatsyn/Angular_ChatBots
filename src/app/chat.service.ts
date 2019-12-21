import {Injectable} from '@angular/core';
import {merge, Observable, pipe, Subject} from 'rxjs';
import {filter, scan, tap} from 'rxjs/operators';

export  class Message {
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
    // this.messagesFromCurrentChat$.subscribe((message: Message[]) => {
    //   console.log('messagesFromCurrentChat$  ' + message)
    //   this.messagesFromCurrentChat = message;
    // });
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
      console.log(this.messagesFromCurrentChat);
    });
    // this.newMessage$.subscribe((m: Message) => {
    //   if (m.recipient === this.nameOfActiveBot) {
    //     this.messagesFromCurrentChat.push(m);
    //   }
    // });

    //.pipe(
    //       filter((m: Message)  => m.sender === 'user' || m.recipient === this.nameOfActiveBot)
    //     )
    // this.messages$.subscribe(m => this.messages = m)
  }

  messagesFromCurrentChat$: Observable<Message[]>;
  messagesFromCurrentChat: Message[] = [];
  nameOfActiveBot: string;
  messages: Message[] = [];
  sentMessage$;
  incomingMessage$;

  newMessage$;

  messages$: Observable<Message[]>;

  public send(userName: string, message: string) {
    this.sentMessage$.next(new Message(userName, message, ''));

  }

  sendMessageFromUser(newMessage: Message) {
    this.sentMessage$.next(newMessage);
    // this.sentMessage$.asObservable().subscribe(a => console.log(a));
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

  results() {
    // this.messages$.forEach((c: Message[]) => c.forEach(c => console.log('n ' + c.text)));
    // this.newMessage$.forEach(c => console.log('newMessage' + c));
    // this.sentMessage$.forEach(c => console.log('sent   ' + c));
    // this.incomingMessage$.forEach(c => console.log('incoming   ' + c));

  }

  getMessagesFromBot(botName: string) {
    let messages = [];
    this.messages$.subscribe(m => messages = m);
    console.log(messages);
    return messages;
  }

  getAllMessages(): Message[] {
    // const messages = [];
    // // this.messages$.subscribe(m => messages.push(m));
    // this.incomingMessage$.subscribe(m => messages.push(m));
    // this.sentMessage$.subscribe(m => messages.push(m));
    return this.messages;
  }
}
