import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BHRoom';
}

export class Alert {
  type: string;
  message: string;
  constructor(_type: string, _message: string)
  {
    this.type=_type;
    this.message=_message
  }
}
