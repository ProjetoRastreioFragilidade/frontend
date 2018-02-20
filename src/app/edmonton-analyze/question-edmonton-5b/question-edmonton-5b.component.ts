import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-5b',
  templateUrl: './question-edmonton-5b.component.html',
  styleUrls: ['./question-edmonton-5b.component.scss']
})
export class QuestionEdmonton5bComponent implements OnInit {

  @Input() Q5b;

  @Output() q5b: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q5b = 1;
    this.q5b.emit(1);
  }
  public no() {
    this.Q5b = 2;
    this.q5b.emit(2);
  }
}
