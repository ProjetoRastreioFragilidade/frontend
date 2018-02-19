import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-question-5',
  templateUrl: './question-5.component.html',
  styleUrls: ['./question-5.component.scss']
})
export class Question5Component implements OnInit {

  @Input() Q5;

  @Output() q5: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public never() {
    this.Q5 = 1;
    this.q5.emit(1);
  }
  public sometimes() {
    this.Q5 = 2;
    this.q5.emit(2);
  }
  public freq() {
    this.Q5 = 3;
    this.q5.emit(3);
  }
  public aways() {
    this.Q5 = 4;
    this.q5.emit(4);
  }
}
