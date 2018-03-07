import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadService, SharedService } from '@services';

@Component({
  selector: 'app-question-edmonton-1',
  templateUrl: './question-edmonton-1.component.html',
  styleUrls: ['./question-edmonton-1.component.scss']
})
export class QuestionEdmonton1Component implements OnInit {


  @Input() Q1;
  @Input() image = '';

  @Output() q1: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() file_emitter: EventEmitter<string> = new EventEmitter<string>();

  public errorMessage: string;

  constructor(
    private uploadService: UploadService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  public nextQuestion(next: number) {
    this.next.emit(next);
  }
  public approved() {
    this.Q1 = 1;
    this.q1.emit(1);
  }
  public minErrors() {
    this.Q1 = 2;
    this.q1.emit(2);
  }
  public maxErrors() {
    this.Q1 = 3;
    this.q1.emit(3);
  }
  public getFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      let formData = new FormData();
      formData.append('image', event.target.files[0]);

      this.sharedService.startBlockUI();
      this.uploadService.upload(formData).subscribe(image => {
        this.image = "http://ppsus.icmc.usp.br" + image.image_url;
        this.file_emitter.emit(this.image);
        this.sharedService.stopBlockUI();
      }, err => {
        // TODO Ver se é assim que ele vai retornar o erro
        this.errorMessage = err.msg;
        console.log(err);
        this.sharedService.stopBlockUI();
      });
    }
  }
}
