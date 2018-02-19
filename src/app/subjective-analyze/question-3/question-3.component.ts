import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-question-3',
  templateUrl: './question-3.component.html',
  styleUrls: ['./question-3.component.scss']
})
export class Question3Component implements OnInit {

  @Input() Q3;

  @Output() q3: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q3 = 1;
    this.q3.emit(1);
  }
  public no() {
    this.Q3 = 2;
    this.q3.emit(2);
  }
  public notKnow() {
    this.Q3 = 3;
    this.q3.emit(3);
  }
  public notAnswer() {
    this.Q3 = 4;
    this.q3.emit(4);
  }
}
