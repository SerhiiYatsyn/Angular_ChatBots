import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {messages$, incomingMessage$, Message, sentMessage$} from '../../chat';
import {merge, Observable, Subject} from 'rxjs';
import {filter, map, scan, tap} from 'rxjs/operators';
import {Message} from '../../chat.service';
import {Bot, registry} from '../../bot';
import {ChatService} from '../../chat.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  nameOfActiveBot: string;
  messages: Message[];
  currentChatMessages: Message[];

  constructor(private chatService: ChatService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.messages = this.chatService.getAllMessages();
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (registry.bots().find(b => b.name === param.botName)) {
        this.chatService.nameOfActiveBot = param.botName;
        this.chatService.emulateChange();
        this.messages = this.chatService.messagesFromCurrentChat;
      } else {
        this.router.navigateByUrl('/not-found');
      }
    });
    this.chatService.messages$.subscribe(() => this.messages = this.chatService.messagesFromCurrentChat);
  }


  emitIncoming() {
    this.chatService.getMessagesFromBot(this.chatService.nameOfActiveBot);
    this.chatService.sendMessageFromBot(new Message(this.chatService.nameOfActiveBot, 'qwre', 'user'));
    console.log(this.messages);
  }
}


