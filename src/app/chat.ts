// import {Subject, Observable, merge} from 'rxjs';
// import {scan} from 'rxjs/operators';
//
// export class Message {
//   constructor(public sender: string, public text: string, public recipient: string) {
//   }
//
//   print(): string {
//     return `${this.sender}: ${this.text}`;
//   }
// }
//
// export const sentMessage$: Subject<Message> = new Subject();
// export const incomingMessage$: Subject<Message> = new Subject();
//
// export const newMessage$ = merge<Message>(sentMessage$, incomingMessage$);
//
// export const messages$: Observable<Message[]> = newMessage$.pipe(
//   scan((messages: any, m) => [...messages, m], [])
// );
//
// export function send(message: string) {
//   sentMessage$.next(new Message('user', message, ''));
// }
