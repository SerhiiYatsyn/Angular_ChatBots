import {registry, Bot} from '../bot';
import {delay, map, scan} from 'rxjs/operators';
import {pipe} from 'rxjs';

export const ADD_BOT: Bot = {
  name: 'add',
  description: 'Sums your numbers.'
};
const findNumber = (message: string): number => +message.split(' ')[1];
const append = (list: number[], elem: number) => [...list, elem];
const joinExpression = (list: number[]): string => {
  const sum = list.reduce((sum, current) => sum + current);
  let result = list.join(' + ');
  result = 0 + ' + ' + result + ' = ' + sum;
  return result;
};
registry.addBot(ADD_BOT, pipe(
  map(findNumber),
  scan(append, []),
  map(joinExpression)
));
