import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { BodyComponent } from './components/body/body.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';
import { BattleLogComponent } from './components/battle-log/battle-log.component';
import { LogPokemonDirective } from './directive/log-pokemon.directive';

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
    BodyComponent,
    PokemonDisplayComponent,
    BattleLogComponent,
    LogPokemonDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
