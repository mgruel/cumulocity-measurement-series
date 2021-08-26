import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ChartjsModule } from "@ctrl/ngx-chartjs";
import { AppComponent } from "./app.component";
import { ServicesModule } from "../services/services.module";
import { CommonComponentsModule } from "../components/components.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingInterceptor } from "../interceptors/loading.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    ServicesModule,
    CommonComponentsModule,
    ChartjsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
