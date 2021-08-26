import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RequestOptionsComponent } from "./request-options/request-options.component";
import { MeasurementsChart } from "./measurements-chart/measurements-chart.component";
import { ChartjsModule } from "@ctrl/ngx-chartjs";

@NgModule({
  imports: [CommonModule, FormsModule, ChartjsModule],
  declarations: [RequestOptionsComponent, MeasurementsChart],
  exports: [RequestOptionsComponent, MeasurementsChart]
})
export class CommonComponentsModule {}
