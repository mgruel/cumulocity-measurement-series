import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RequestOptionsComponent } from "./request-options/request-options.component";
import { MeasurementsChart } from "./measurements-chart/measurements-chart.component";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { ChartjsComponent } from "./chart/chart.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RequestOptionsComponent, MeasurementsChart, LoadingBarComponent, ChartjsComponent],
  exports: [RequestOptionsComponent, MeasurementsChart, LoadingBarComponent, ChartjsComponent]
})
export class CommonComponentsModule {}
