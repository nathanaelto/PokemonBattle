import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { BodyComponent } from './components/body/body.component';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
    BodyComponent,
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
