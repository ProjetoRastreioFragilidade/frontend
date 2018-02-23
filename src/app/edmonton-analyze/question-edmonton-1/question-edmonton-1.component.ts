import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoFile } from '@models';

@Component({
  selector: 'app-question-edmonton-1',
  templateUrl: './question-edmonton-1.component.html',
  styleUrls: ['./question-edmonton-1.component.scss']
})
export class QuestionEdmonton1Component implements OnInit {


  @Input() Q1;

  @Output() q1: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() file_emitter: EventEmitter<PhotoFile> = new EventEmitter<PhotoFile>();

  public file_to_return: PhotoFile = {};

  constructor() { }

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
    //let reader = new FileReader();
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file_to_return.filename = file.name;
        this.file_to_return.filetype = file.type;
        this.file_to_return.value = reader.result.split(',')[1];
        //console.log("reader result: " + reader.result);
      }

      let formData = new FormData();
      //formData.append('name', 'batata.png');
      formData.append('image', event.target.files[0]);
      this.file_to_return.value = formData;
      this.file_emitter.emit(this.file_to_return);
      /*reader.readAsDataURL(file);
      reader.onload = () => {
          this.file.filename =  file.name,
          this.file.filetype =  file.type,
          this.file.value =  reader.result.split(',')[1]
      };*/

    }
  }
}
