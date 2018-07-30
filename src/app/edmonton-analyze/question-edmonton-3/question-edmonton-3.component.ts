import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-edmonton-3',
  templateUrl: './question-edmonton-3.component.html',
  styleUrls: ['./question-edmonton-3.component.scss']
})
export class QuestionEdmonton3Component implements OnInit {

  @Input() Q3: number[] = [];

  @Output() q3: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }

  public cook() {
    if(this.find(1)) {
      this.remove(1, this.Q3);
    } else {
      this.Q3.push(1);
    }
    this.q3.emit(this.Q3);
  }
  public phone() {
    if (this.find(2)) {
      this.remove(2, this.Q3);
    } else {
      this.Q3.push(2);
    }
    this.q3.emit(this.Q3);
  }
  public move() {
    if (this.find(3)) {
      this.remove(3, this.Q3);
    } else {
      this.Q3.push(3);
    }
    this.q3.emit(this.Q3);
  }
  public cleanClothes() {
    if (this.find(4)) {
      this.remove(4, this.Q3);
    } else {
      this.Q3.push(4);
    }
    this.q3.emit(this.Q3);
  }
  public cleanHouse() {
    if (this.find(5)) {
      this.remove(5, this.Q3);
    } else {
      this.Q3.push(5);
    }
    this.q3.emit(this.Q3);
  }
  public manageMoney() {
    if (this.find(6)) {
      this.remove(6, this.Q3);
    } else {
      this.Q3.push(6);
    }
    this.q3.emit(this.Q3);
  }
  public shopping() {
    if (this.find(7)) {
      this.remove(7, this.Q3);
    } else {
      this.Q3.push(7);
    }
    this.q3.emit(this.Q3);
  }
  public remedy() {
    if (this.find(8)) {
      this.remove(8, this.Q3);
    } else {
      this.Q3.push(8);
    }
    this.q3.emit(this.Q3);
  }

  public remove(key: number, array: number[]) {
    const index = array.indexOf(key, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  public find(num: number): boolean {
    return this.Q3.some(element => element === num);
  }
}
