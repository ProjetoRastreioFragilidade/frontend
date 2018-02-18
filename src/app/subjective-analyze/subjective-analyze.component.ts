import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjective-analyze',
  templateUrl: './subjective-analyze.component.html',
  styleUrls: ['./subjective-analyze.component.scss']
})
export class SubjectiveAnalyzeComponent implements OnInit {

  public question = 1;

  constructor() { }

  ngOnInit() {
  }

  public goTo(question: number) {
    this.question = question;
  }

}
