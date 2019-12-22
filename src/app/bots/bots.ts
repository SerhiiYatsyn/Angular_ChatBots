import {Bot, hasWord, Reply} from '../bot';
import {from, interval, merge, Observable, pipe, zip} from 'rxjs';
import {delay, filter, map, mergeMap, scan, switchMap, takeUntil, throttleTime} from 'rxjs/operators';
import {currentWeather, WeatherConditions} from './weather.service';

const findNumber = (message: string): number => +message.split(' ')[1];
const append = (list: number[], elem: number) => [...list, elem];
const joinExpression = (list: number[]): string => {
  const sum = list.reduce((sum, current) => sum + current);
  let result = list.join(' + ');
  result = 0 + ' + ' + result + ' = ' + sum;
  return result;
};

// function holdTheDoor(): Observable<any> {
//   return from(hodorYell).pipe(
//     zip(interval(2000)),
//     map<Array<any>, string>(z => z[0])
//   );
// }

let jokes: string[] = [
  'Программисты на работе общаются двумя фразами: «непонятно» и «вроде работает».\n',
  'Работа программиста и шамана имеет много общего — оба бормочут непонятные слова, совершают непонятные действия и не могут объяснить, как оно работает. \n',
  'Из форума программистов: — Помогитенеработаетпробел!!! — Настоящие_программисты_пробелами_не_пользуются.\n'
];
let jokesState: number = 0;


export const ADD_BOT: Bot = {
  name: 'add',
  description: 'Sums your numbers.'
};
export const ADD_BOT_ACTION = pipe(
  map(findNumber),
  scan(append, []),
  map(joinExpression)
);

export const DANY_BOT: Bot = {
  name: 'dany',
  description: 'Repeats phrase.'
};
export const DANY_BOT_ACTION = pipe(
  pipe(
    switchMap(m =>
      interval(1000).pipe(
        map(i => 'I am the Queen 🔥 I need your love 💙')
      ))
  ));

export const ECHO_BOT: Bot = {
  name: 'echo',
  description: 'Repeats your message after 1 second delay.'
};
export const ECHO_BOT_ACTION = delay(1000) as Reply;

export const HODOR_BOT: Bot = {
  name: 'hodor',
  description: 'Holds the door.'
};
// export const HODOR_BOT_ACTION = switchMap(holdTheDoor);

export const hodorYell = [
  'Hold the door',
  'Hold th door',
  'Hold t door',
  'Hol t door',
  'Hol door',
  'Hodor',
];

export const IMP_BOT: Bot = {
  name: 'imp',
  description: 'stays drunk for 5 seconds, he is don’t mind to drink, when he is fresh. each 3 drinks he says a random not said joke and then repeats \n.'
};
export const IMP_BOT_ACTION = pipe(
  throttleTime(5000),
  map(() => {
    if (jokesState === 3) {
      jokesState = 0;
    }
    return jokes[jokesState++];
  })
);

export const JOFFREY_BOT: Bot = {
  name: 'joffrey',
  description: 'Constantly repeat that he is the king untill wedding.'
};
export const JOFFREY_BOT_ACTION = function iAmTheKing(message$: Observable<string>): Observable<string> {
  let isWedding = hasWord('wedding');
  let wedding$ = filter(isWedding)(message$);

  return merge(
    message$.pipe(
      filter(m => !isWedding(m)),
      switchMap(m =>
        interval(3000).pipe(
          map(i => 'I am the king! '),
          takeUntil(wedding$)
        )
      )
    ),
    wedding$.pipe(
      delay(200),
      map(m => '🍷 cough... cough... cough... 💀')
    )
  );
};

export const WEATHER_BOT: Bot = {
  name: 'weather',
  description: 'Responds with current weather in Cherkasy.'
};
export const WEATHER_BOT_ACTION = pipe(
  mergeMap(currentWeather),
  map<WeatherConditions, string>(w => `${w.temp}C, ${w.humidity}%, ${w.description}`)
);






