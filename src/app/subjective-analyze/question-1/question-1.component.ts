import { Component, OnInit, Output, EventEmitter, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'app-question-1',
  templateUrl: './question-1.component.html',
  styleUrls: ['./question-1.component.scss']
})
export class Question1Component implements OnInit, OnDestroy {

  public question_kg = false;

  @Input() Q1;
  @Input() KG;

  @Output() q1: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() q1_kg_emitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  
  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public yes() {
    this.Q1 = 1;
    this.question_kg = true;
    this.q1.emit(1);
  }
  public no() {
    this.Q1 = 2;
    this.question_kg = false;
    this.q1.emit(2);
  }
  public notKnow() {
    this.Q1 = 3;
    this.question_kg = false;
    this.q1.emit(3);
  }
  public notAnswer() {
    this.Q1 = 4;
    this.question_kg = false;
    this.q1.emit(4);
  }
  ngOnDestroy() {
    this.q1_kg_emitter.emit(this.KG);
  }
}
