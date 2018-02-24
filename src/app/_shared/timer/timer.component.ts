import { Component, OnInit } from '@angular/core';
import {SimpleTimer} from 'ng2-simple-timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

	public sec = 0;
	public timer0Id: string;
	public timer0button = 'Iniciar';
  public min = 0;


  constructor(private st: SimpleTimer) { }

  ngOnInit() {
    this.st.newTimer('1sec',1);
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
		} else {
			// Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
			this.timer0button = 'Parar';
    }
  }

  public timer0callback() {
    this.sec++;
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
      this.sec = 0;
      this.min = 0;
    } else {
      this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
      this.st.unsubscribe(this.timer0Id);
      this.timer0Id = undefined;
			this.timer0button = 'Iniciar';
      this.sec = 0;
      this.min = 0;
    }
  }

}
