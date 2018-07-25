import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  public timer0Id: string;
	public timer0button = 'Iniciar';
  
  public mili = 0;
	public sec = 0;
  public min = 0;

  @Input() finalTime = 0;

  @Output() timeEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private st: SimpleTimer) { }

  ngOnInit() {
    this.st.newTimer('1sec',0.01);
    if(this.finalTime != 0 && this.finalTime) {
      this.mili = +Math.trunc(100*(+(this.finalTime % 1).toFixed(2)));
      this.sec = +Math.trunc(this.finalTime % 60);
      this.min = +Math.trunc((this.finalTime - this.sec) / 60);
      this.finalTime = 0;
    }
  }

  delAllTimer() {
    this.st.delTimer('1sec');
  }

  public subscribeTimer0() {
		if (this.timer0Id) {
			// Unsubscribe if timer Id is defined
      this.st.unsubscribe(this.timer0Id);
      
			this.timer0Id = undefined;
      this.timer0button = 'Iniciar';
      this.finalTime = this.min * 60 + this.sec + (+(this.mili/100).toFixed(2));
      this.timeEmitter.emit(this.finalTime);
		} else {
      // Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
      this.timer0button = 'Parar';
    }
  }

  public timer0callback() {
    this.mili++;
    if (this.mili === 100) {
      this.mili = 0;
      this.sec++;
    }
    if (this.sec === 60) {
      this.sec = 0;
      this.min++;
    }
  }

  public reset() {
    if (this.timer0Id) {
      this.st.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
      this.timer0button = 'Iniciar';
      this.mili = 0;
      this.sec = 0;
      this.min = 0;
    } else {
      this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
      this.st.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
			this.timer0button = 'Iniciar';
      this.mili = 0;
      this.sec = 0;
      this.min = 0;
    }
  }

}
