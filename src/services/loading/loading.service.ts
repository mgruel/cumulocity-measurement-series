import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly isLoading = this.loading.asObservable();

  setLoading(loading: boolean): void {
    this.loading.next(loading);
  }
}
