import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-1',
  templateUrl: './question-edmonton-1.component.html',
  styleUrls: ['./question-edmonton-1.component.scss']
})
export class QuestionEdmonton1Component implements OnInit {


  @Input() Q1;

  @Output() q1: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public approved() {
    this.Q1 = 1;
    this.q1.emit(1);
  }
  public minErrors() {
    this.Q1 = 2;
    this.q1.emit(2);
  }
  public maxErrors() {
    this.Q1 = 3;
    this.q1.emit(3);
  }

}
