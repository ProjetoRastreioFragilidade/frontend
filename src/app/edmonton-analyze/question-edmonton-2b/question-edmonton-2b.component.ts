import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-2b',
  templateUrl: './question-edmonton-2b.component.html',
  styleUrls: ['./question-edmonton-2b.component.scss']
})
export class QuestionEdmonton2bComponent implements OnInit {

  @Input() Q2b;

  @Output() q2b: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }

  public excelente() {
    this.Q2b = 1;
    this.q2b.emit(1);
  }

  public veryGood() {
    this.Q2b = 2;
    this.q2b.emit(2);
  }

  public good() {
    this.Q2b = 3;
    this.q2b.emit(3);
  }
  public reasonable() {
    this.Q2b = 4;
    this.q2b.emit(4);
  }
  
  public bad() {
    this.Q2b = 5;
    this.q2b.emit(5);
  }
}
