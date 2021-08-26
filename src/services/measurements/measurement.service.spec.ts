import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ReplaySubject } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import {
  AggregationType,
  Datasets,
  RequestOptions
} from "../../models/measurement.model";
import {
  MeasurementService,
  getMeasurementSeriesUrl
} from "./measurement.service";

describe("Service: Measurement", () => {
  let testScheduler: TestScheduler;
  let httpCtrl: HttpTestingController;
  let service: MeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MeasurementService]
    });
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    httpCtrl = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MeasurementService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should throw error if no RequestOptions are provided", () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(service.getMeasurements(null)).toBe(
        "#",
        null,
        new Error("Missing Request-Options")
      );
    });
  });

  it("should throw error if no Auth-Token is provided", () => {
    testScheduler.run(({ expectObservable }) => {
      expectObservable(service.getMeasurements({} as RequestOptions)).toBe(
        "#",
        null,
        new Error("Missing Auth-Token")
      );
    });
  });

  it("should return an Observable", () => {
    testScheduler.run(({ expectObservable }) => {
      const requestOptions: RequestOptions = {
        authToken: "token",
        sourceId: "source",
        dateFrom: new Date(),
        dateTo: new Date(),
        aggregationType: AggregationType.DAILY
      };
      const replaySubject = new ReplaySubject<Datasets>();
      const colorDef = { borderColor: "red", backgroundColor: "red" };
      service.getMeasurements(requestOptions, colorDef).subscribe(replaySubject);
      httpCtrl
        .expectOne(req => {
          return (
            req.url.includes(getMeasurementSeriesUrl()) && req.method === "GET"
          );
        })
        .flush({
          values: { temp: [], pressure: [] },
          series: [{ unit: "°C", name: "temp", type: "MEASUREMENT" }, { unit: "mhg", name: "pressure", type: "MEASUREMENT" }],
          truncated: false
        });
      expectObservable(replaySubject).toBe("(a|)", {
        a: [
          {
            backgroundColor: colorDef.backgroundColor,
            borderColor: colorDef.borderColor,
            borderWidth: 1,
            data: [],
            label: "MEASUREMENT.temp"
          },
          {
            backgroundColor: colorDef.backgroundColor,
            borderColor: colorDef.borderColor,
            borderWidth: 1,
            data: [],
            label: "MEASUREMENT.pressure"
          }
        ]
      });
    });
  });
});
