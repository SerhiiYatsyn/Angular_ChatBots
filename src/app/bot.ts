import {Message} from './chat.service';
import {OperatorFunction} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

const bots: Bot[] = new Array<Bot>();

export interface Bot {
  name: string;
  description: string;
}

export interface Reply extends OperatorFunction<string, string> {
}

export const registry = {
  addBot(bot: Bot, reply: Reply, sentMessage$, incomingMessage$) {
    bots.push(bot);
    subscribeBot(bot, reply, sentMessage$, incomingMessage$);
  },
  bots(): Bot[] {
    return [...bots];
  },
};

function subscribeBot(bot: Bot, reply: Reply, sentMessage$, incomingMessage$) {
  sentMessage$.pipe(
    tap(m => console.log(m)),
    filter((m: Message) => (m.sender === 'user' || m.sender === bot.name) && m.recipient === bot.name),
    map((m: Message) => m.text),
    tap(m => console.log(m)),
    reply,
    tap(m => console.log(m)),
    map((m: string) => new Message(bot.name, m, 'user'))
  ).subscribe(incomingMessage$);
}

export function hasWord(word: string): (message: string) => boolean {
  return (m: string) => {
    return testForWord(m, word);
  };
}

function testForWord(message: string, word: string) {
  return message.split(/\s+/).indexOf(word) > -1;
}
