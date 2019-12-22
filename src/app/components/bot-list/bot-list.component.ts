import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../chat.service';
import {Bot, registry} from '../../bot';

@Component({
  selector: 'app-bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent implements OnInit {

  constructor(public chatService: ChatService) {
    this.bots = registry.bots();
  }

  bots: Bot[];

  ngOnInit() {
  }

  getClickedBotName($event) {
    this.chatService.nameOfActiveBot = $event.target.innerText;
  }
}
