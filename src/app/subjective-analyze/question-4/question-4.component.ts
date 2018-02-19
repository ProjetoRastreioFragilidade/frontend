import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-4',
  templateUrl: './question-4.component.html',
  styleUrls: ['./question-4.component.scss']
})
export class Question4Component implements OnInit {

  @Output() q4: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.q4.emit(1);
  }
  public no() {
    this.q4.emit(2);
  }
  public notKnow() {
    this.q4.emit(3);
  }
  public notAnswer() {
    this.q4.emit(4);
  }
}
