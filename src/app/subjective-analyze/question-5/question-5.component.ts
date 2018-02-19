import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-question-5',
  templateUrl: './question-5.component.html',
  styleUrls: ['./question-5.component.scss']
})
export class Question5Component implements OnInit {

  @Output() q5: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public never() {
    this.q5.emit(1);
  }
  public sometimes() {
    this.q5.emit(2);
  }
  public freq() {
    this.q5.emit(3);
  }
  public aways() {
    this.q5.emit(4);
  }
}
