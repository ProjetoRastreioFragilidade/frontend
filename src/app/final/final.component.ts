import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '@services';
import { Subjective } from '@models';
@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit, OnDestroy {

  public sub: any;
  public testId: number;
  public test: Subjective = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService
  ) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.testId = +params['id'];
  });
    this.testService.findTestById(this.testId).subscribe(subjective => {
      this.test = subjective;
    })
  }
  ngOnDestroy() {

  }

}
