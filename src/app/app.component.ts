import { Component } from "@angular/core";
import { AppState } from "./app.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [AppState]
})
export class AppComponent {
  constructor(public state: AppState) {}
}
