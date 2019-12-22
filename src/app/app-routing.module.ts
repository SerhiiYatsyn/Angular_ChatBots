import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChatComponent} from './components/chat/chat.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const appRoutes: Routes = [
  {path: 'bot/not-found', component: NotFoundComponent},
  {path: 'bot/:botName', component: ChatComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
