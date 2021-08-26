import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonComponentsModule } from "../components/components.module";
import { LoadingInterceptor } from "../interceptors/loading.interceptor";
import { ServicesModule } from "../services/services.module";
import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, ServicesModule, CommonComponentsModule],
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
