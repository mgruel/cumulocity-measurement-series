import { Component } from "@angular/core";
import { AppPloc } from "./app.ploc";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [AppPloc]
})
export class AppComponent {
  constructor(public ploc: AppPloc) {}
}
