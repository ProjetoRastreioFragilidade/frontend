import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edmonton-analyze',
  templateUrl: './edmonton-analyze.component.html',
  styleUrls: ['./edmonton-analyze.component.scss']
})
export class EdmontonAnalyzeComponent implements OnInit {

  public question = 1;

  constructor() { }

  ngOnInit() {
  }

  public goTo(question: number) {
    this.question = question;
  }

}
  