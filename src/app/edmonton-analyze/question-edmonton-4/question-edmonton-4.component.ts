import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-4',
  templateUrl: './question-edmonton-4.component.html',
  styleUrls: ['./question-edmonton-4.component.scss']
})
export class QuestionEdmonton4Component implements OnInit {

  @Input() Q4;

  @Output() q4: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  
  public aways() {
    this.Q4 = 1;
    this.q4.emit(1);
  }
  public sometimes() {
    this.Q4 = 2;
    this.q4.emit(2);
  }
  public never() {
    this.Q4 = 3;
    this.q4.emit(3);
  }
}
