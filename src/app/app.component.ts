import { Component } from '@angular/core';
import { RouterService } from '@services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PPSUS';
  constructor(private routerService: RouterService) {

  }
}
