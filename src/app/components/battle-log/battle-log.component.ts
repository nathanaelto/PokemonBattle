import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../../models/log';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  @Input() logs: Log[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
