import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-6',
  templateUrl: './question-edmonton-6.component.html',
  styleUrls: ['./question-edmonton-6.component.scss']
})
export class QuestionEdmonton6Component implements OnInit {

  @Input() Q6;

  @Output() q6: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  
  public yes() {
    this.Q6 = 1;
    this.q6.emit(1);
  }
  public no() {
    this.Q6 = 2;
    this.q6.emit(2);
  }
}
