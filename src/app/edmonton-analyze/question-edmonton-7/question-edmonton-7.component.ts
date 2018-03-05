import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-7',
  templateUrl: './question-edmonton-7.component.html',
  styleUrls: ['./question-edmonton-7.component.scss']
})
export class QuestionEdmonton7Component implements OnInit {

  @Input() Q7;

  @Output() q7: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  
  public yes() {
    this.Q7 = 1;
    this.q7.emit(1);
  }
  public no() {
    this.Q7 = 2;
    this.q7.emit(2);
  }

}
