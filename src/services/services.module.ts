import { NgModule } from "@angular/core";
import { MeasurementService } from "./measurements/measurement.service";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [MeasurementService]
})
export class ServicesModule {}
