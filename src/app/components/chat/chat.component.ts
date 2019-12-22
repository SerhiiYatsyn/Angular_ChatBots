import {Component, OnInit} from '@angular/core';
import {Message} from '../../chat.service';
import {registry} from '../../bot';
import {ChatService} from '../../chat.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[];

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
        this.router.navigateByUrl('/bot/not-found');
      }
    });
    this.chatService.messages$.subscribe(() => this.messages = this.chatService.messagesFromCurrentChat);
  }

  emitIncoming() {
    this.chatService.sendMessageFromBot(new Message(this.chatService.nameOfActiveBot, 'qwre', 'user'));
  }
}


