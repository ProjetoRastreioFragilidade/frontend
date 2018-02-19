import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-question-2',
  templateUrl: './question-2.component.html',
  styleUrls: ['./question-2.component.scss']
})
export class Question2Component implements OnInit {

  @Input() Q2;

  @Output() q2: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q2 = 1;
    this.q2.emit(1);
  }
  public no() {
    this.Q2 = 2;
    this.q2.emit(2);
  }
  public notKnow() {
    this.Q2 = 3;
    this.q2.emit(3);
  }
  public notAnswer() {
    this.Q2 = 4;
    this.q2.emit(4);
  }

}
