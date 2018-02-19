import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-3',
  templateUrl: './question-3.component.html',
  styleUrls: ['./question-3.component.scss']
})
export class Question3Component implements OnInit {

  @Output() q3: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.q3.emit(1);
  }
  public no() {
    this.q3.emit(2);
  }
  public notKnow() {
    this.q3.emit(3);
  }
  public notAnswer() {
    this.q3.emit(4);
  }
}
