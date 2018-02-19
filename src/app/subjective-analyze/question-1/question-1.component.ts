import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-1',
  templateUrl: './question-1.component.html',
  styleUrls: ['./question-1.component.scss']
})
export class Question1Component implements OnInit {

  @Output() q1: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.q1.emit(1);
  }
  public no() {
    this.q1.emit(2);
  }
  public notKnow() {
    this.q1.emit(3);
  }
  public notAnswer() {
    this.q1.emit(4);
  }
}
