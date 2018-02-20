import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-9',
  templateUrl: './question-edmonton-9.component.html',
  styleUrls: ['./question-edmonton-9.component.scss']
})
export class QuestionEdmonton9Component implements OnInit {

  public question_time = false;

  @Input() Q9;
  @Input() time;

  @Output() q9: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() time_emitter: EventEmitter<number> = new EventEmitter<number>();

  @Output() save: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }

  public tenSec() {
    this.Q9 = 1;
    this.question_time = true;
    this.q9.emit(1);
  }
  public twentySec() {
    this.Q9 = 2;
    this.question_time = false;
    this.q9.emit(2);
  }
  public moreSec() {
    this.Q9 = 3;
    this.question_time = false;
    this.q9.emit(3);
  }
  public saveTest() {
    this.save.emit();
  }

  public onSearchChange() {
    this.time_emitter.emit(this.time);
    console.log('aqui');
  }

}
