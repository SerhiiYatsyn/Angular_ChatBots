// import {Injectable} from '@angular/core';
// import {OperatorFunction} from 'rxjs';
// import {filter, map, tap} from 'rxjs/operators';
// import {ChatService, Message} from './chat.service';
//
//
// export interface Bot {
//   name: string;
//   description: string;
// }
//
// export const bots: Bot[] = new Array<Bot>();
//
// export interface Reply extends OperatorFunction<string, string> {
// }
//
// // function subscribeBot(bot: Bot, reply: Reply) {
// //   this.chatService.sentMessage$.pipe(
// //     tap(f => console.log(f)),
// //     filter((b: Bot) => b.name === 'add'),
// //     map(m => m),
// //     reply,
// //     map(m => new Message(bot.name, '', ''))
// //   ).subscribe(this.chatService.incomingMessage$);
// // }
//
//   @;
// Injectable({
//   providedIn: 'root'
// });
//
// export class BotService {
//
//   constructor(public chatService: ChatService) {
//   }
//
//   registry = {
//     addBot(bot: Bot, reply: Reply) {
//       bots.push(bot);
//       this.subscribeBot(bot, reply);
//     },
//     bots(): Bot[] {
//       return [...this.bots];
//     },
//   };
//
//   subscribeBot(bot: Bot, reply: Reply) {
//     this.chatService.sentMessage$.pipe(
//       tap(f => console.log(f)),
//       filter((b: Bot) => b.name === 'add'),
//       map(m => m),
//       reply,
//       map(m => new Message(bot.name, '', ''))
//     ).subscribe(this.chatService.incomingMessage$);
//   }
//
//
// }
