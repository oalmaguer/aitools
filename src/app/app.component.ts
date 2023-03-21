import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  title = 'aitools';
  public tools: any;
  headers: any;
  public aitools: any;

  // int = {
  //   "tool_mage_url": ,
  //   "tool":
  //   "tool_description":
  //   "category":
  //   "upvotes":
  //   "tags"
  // }

  ngOnInit() {}
}
