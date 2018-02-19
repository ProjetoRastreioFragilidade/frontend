import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-question-4',
  templateUrl: './question-4.component.html',
  styleUrls: ['./question-4.component.scss']
})
export class Question4Component implements OnInit {

  @Input() Q4;

  @Output() q4: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q4 = 1;
    this.q4.emit(1);
  }
  public no() {
    this.Q4 = 2;
    this.q4.emit(2);
  }
  public notKnow() {
    this.Q4 = 3;
    this.q4.emit(3);
  }
  public notAnswer() {
    this.Q4 = 4;
    this.q4.emit(4);
  }
}
