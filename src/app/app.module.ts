import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { BodyComponent } from './components/body/body.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';
import { BattleLogComponent } from './components/battle-log/battle-log.component';
import {BattleService} from './services/battle.service';
import { SelectScreenComponent } from './components/select-screen/select-screen.component';
import { FightScreenComponent } from './components/fight-screen/fight-screen.component';
import { WinnerScreenComponent } from './components/winner-screen/winner-screen.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PokemonSelectComponent } from './components/pokemon-select/pokemon-select.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
    BodyComponent,
    PokemonDisplayComponent,
    BattleLogComponent,
    SelectScreenComponent,
    FightScreenComponent,
    WinnerScreenComponent,
    NotFoundComponent,
    PokemonSelectComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BattleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
