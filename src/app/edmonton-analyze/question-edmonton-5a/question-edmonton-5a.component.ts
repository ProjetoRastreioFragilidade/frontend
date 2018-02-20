import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-5a',
  templateUrl: './question-edmonton-5a.component.html',
  styleUrls: ['./question-edmonton-5a.component.scss']
})
export class QuestionEdmonton5aComponent implements OnInit {

  @Input() Q5a;

  @Output() q5a: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q5a = 1;
    this.q5a.emit(1);
  }
  public no() {
    this.Q5a = 2;
    this.q5a.emit(2);
  }
}
