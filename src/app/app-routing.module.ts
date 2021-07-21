import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectScreenComponent} from "./components/select-screen/select-screen.component";
import {FightScreenComponent} from "./components/fight-screen/fight-screen.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {WinnerScreenComponent} from "./components/winner-screen/winner-screen.component";
import {AppComponent} from "./app.component";
import {BodyComponent} from "./components/body/body.component";

const routes: Routes = [
  {path: 'select', component: SelectScreenComponent},
  {path: 'fight/:idPokemon1/:idPokemon2', component: BodyComponent},
  {path: 'winner', component: WinnerScreenComponent},
  {path: 'not-found', component: NotFoundComponent},
  //{path: "**", redirectTo: "not-found"},
  {path: '', component: SelectScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
