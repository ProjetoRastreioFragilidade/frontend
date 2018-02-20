import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-2a',
  templateUrl: './question-edmonton-2a.component.html',
  styleUrls: ['./question-edmonton-2a.component.scss']
})
export class QuestionEdmonton2aComponent implements OnInit {

  @Input() Q2a;

  @Output() q2a: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  
  public one() {
    this.Q2a = 1;
    this.q2a.emit(1);
  }
  public two() {
    this.Q2a = 2;
    this.q2a.emit(2);
  }
  public three() {
    this.Q2a = 3;
    this.q2a.emit(3);
  }

}
