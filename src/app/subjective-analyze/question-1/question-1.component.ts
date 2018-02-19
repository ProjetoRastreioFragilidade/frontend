import { Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-question-1',
  templateUrl: './question-1.component.html',
  styleUrls: ['./question-1.component.scss']
})
export class Question1Component implements OnInit, OnDestroy {

  public question_kg = false;
  public q1_kg: number = null;

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
    this.question_kg = true;
    this.q1.emit(1);
  }
  public no() {
    this.question_kg = false;
    this.q1.emit(2);
  }
  public notKnow() {
    this.question_kg = false;
    this.q1.emit(3);
  }
  public notAnswer() {
    this.question_kg = false;
    this.q1.emit(4);
  }
  ngOnDestroy() {
    this.q1_kg_emitter.emit(this.q1_kg);
  }
}
