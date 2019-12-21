import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BotListComponent} from './components/bot-list/bot-list.component';
import {AppComponent} from './app.component';
import {ChatComponent} from './components/chat/chat.component';


const appRoutes: Routes = [
  {path: 'bot/:botName', component: ChatComponent},
  // {path: '', component: AppComponent},
  // {path: 'echo', component: AppComponent},
  // {path: 'weather', component: AppComponent},
  // {path: 'hodor', component: AppComponent},
  // {path: 'joffrey', component: AppComponent},
  // {path: 'add', component: AppComponent},
  // {path: 'dany', component: AppComponent},
  // {path: 'imp', component: AppComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // public getRoutes() {
  //   let routes = [];
  //   registry.bots().forEach(b => {
  //     routes.push(
  //       {
  //         path: b.name,
  //         component: AppComponent
  //       }
  //     );
  //   });
  //   return routes;
  // }
}
