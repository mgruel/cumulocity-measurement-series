import { TestBed } from "@angular/core/testing";
import { ReplaySubject } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { LoadingService } from "./loading.service";

describe("Service: Loading", () => {
  let testScheduler: TestScheduler;
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    service = TestBed.inject(LoadingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should emit true after emitting false", () => {
    testScheduler.run(({ expectObservable }) => {
      const replaySubject = new ReplaySubject<boolean>();
      service.isLoading$.subscribe(replaySubject);
      service.setLoading(true);
      expectObservable(replaySubject).toBe("(ft)", { f: false, t: true });
    });
  });

  it("should emit false after emitting false", () => {
    testScheduler.run(({ expectObservable }) => {
      const replaySubject = new ReplaySubject<boolean>();
      service.isLoading$.subscribe(replaySubject);
      service.setLoading(false);
      expectObservable(replaySubject).toBe("(ff)", { f: false, t: true });
    });
  });
});
