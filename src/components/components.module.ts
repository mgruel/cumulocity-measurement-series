import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartjsComponent } from "./chart/chart.component";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { MeasurementsChartComponent } from "./measurements-chart/measurements-chart.component";
import { RequestOptionsComponent } from "./request-options/request-options.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    RequestOptionsComponent,
    MeasurementsChartComponent,
    LoadingBarComponent,
    ChartjsComponent
  ],
  exports: [
    RequestOptionsComponent,
    MeasurementsChartComponent,
    LoadingBarComponent,
    ChartjsComponent
  ]
})
export class CommonComponentsModule {}
