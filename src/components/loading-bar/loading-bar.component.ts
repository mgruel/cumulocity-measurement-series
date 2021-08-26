import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LoadingService } from "../../services/loading/loading.service";

@Component({
  selector: "app-loading-bar",
  templateUrl: "./loading-bar.component.html",
  styleUrls: ["./loading-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBarComponent {
  constructor(public loading: LoadingService) {}
}
