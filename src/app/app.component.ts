import {Component} from '@angular/core';
import {merge, Observable, pipe, Subject} from 'rxjs';
import {map, scan, tap} from 'rxjs/operators';
import {ChatService, Message} from './chat.service';
import {registry} from './bot';
import {
  ADD_BOT,
  ADD_BOT_ACTION,
  DANY_BOT,
  DANY_BOT_ACTION,
  ECHO_BOT,
  ECHO_BOT_ACTION,
  HODOR_BOT,
  // HODOR_BOT_ACTION,
  IMP_BOT, IMP_BOT_ACTION, JOFFREY_BOT, JOFFREY_BOT_ACTION, WEATHER_BOT, WEATHER_BOT_ACTION
} from './bots/bots';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public chatService: ChatService) {
    registry.addBot(ADD_BOT, ADD_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    registry.addBot(DANY_BOT, DANY_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    registry.addBot(ECHO_BOT, ECHO_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    // registry.addBot(HODOR_BOT, HODOR_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    registry.addBot(IMP_BOT, IMP_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    registry.addBot(JOFFREY_BOT, JOFFREY_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);
    registry.addBot(WEATHER_BOT, WEATHER_BOT_ACTION, this.chatService.sentMessage$, this.chatService.incomingMessage$);

  }

  findNumber = (message: string): number => +message.split(' ')[1];
  append = (list: number[], elem: number) => [...list, elem];
  joinExpression = (list: number[]): string => {
    const sum = list.reduce((sum, current) => sum + current);
    let result = list.join(' + ');
    result = 0 + ' + ' + result + ' = ' + sum;
    return result;
  };


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
