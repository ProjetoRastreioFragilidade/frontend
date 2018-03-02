import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-8',
  templateUrl: './question-edmonton-8.component.html',
  styleUrls: ['./question-edmonton-8.component.scss']
})
export class QuestionEdmonton8Component implements OnInit {

  @Input() Q8;

  @Output() q8: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q8 = 1;
    this.q8.emit(1);
  }
  public no() {
    this.Q8 = 2;
    this.q8.emit(2);
  }
}
