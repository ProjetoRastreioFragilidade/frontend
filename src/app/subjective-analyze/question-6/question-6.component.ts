import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-6',
  templateUrl: './question-6.component.html',
  styleUrls: ['./question-6.component.scss']
})
export class Question6Component implements OnInit {

  @Output() q6: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public never() {
    this.q6.emit(1);
  }
  public sometimes() {
    this.q6.emit(2);
  }
  public freq() {
    this.q6.emit(3);
  }
  public aways() {
    this.q6.emit(4);
  }
  public saveTest() {
    this.save.emit();
  }
}
