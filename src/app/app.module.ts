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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PokemonCreateComponent } from './components/pokemon-create/pokemon-create.component';
import { PokemonStatsDisplayComponent } from './components/pokemon-stats-display/pokemon-stats-display.component';
import {PokemonApiService} from './services/pokemon-api.service';
import {HttpClientModule} from '@angular/common/http';
import { PokemonMoveDisplayComponent } from './components/pokemon-move-display/pokemon-move-display.component';
import { PokemonStatsEditorComponent } from './components/pokemon-stats-editor/pokemon-stats-editor.component';
import { PokemonMoveEditorComponent } from './components/pokemon-move-editor/pokemon-move-editor.component';

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
    PokemonCreateComponent,
    PokemonStatsDisplayComponent,
    PokemonMoveDisplayComponent,
    PokemonStatsEditorComponent,
    PokemonMoveEditorComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BattleService, PokemonApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
