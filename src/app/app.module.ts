import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { BodyComponent } from './components/body/body.component';
import { PokemonOneComponent } from './components/pokemon-one/pokemon-one.component';
import { PokemonTwoComponent } from './components/pokemon-two/pokemon-two.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
    BodyComponent,
    PokemonOneComponent,
    PokemonTwoComponent,
    PokemonDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
