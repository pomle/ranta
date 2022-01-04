import { DateTime } from "luxon";
import { findNextSalaryDay } from "../date";

describe("#findNextSalaryDay", () => {
  it("runs forward to 25th", () => {
    const now = DateTime.fromISO("2022-01-01T00:00:00Z");
    const origin = DateTime.fromISO("2022-01-04T00:00:00Z");
    const found = findNextSalaryDay(origin, now);
    expect(found.toISO()).toEqual("2022-01-25T00:00:00.000+00:00");
  });

  it("runs forward to Friday closest to 25th if 25th is on weekend", () => {
    const now = DateTime.fromISO("2022-06-01T00:00:00Z");
    const origin = DateTime.fromISO("2022-06-01T00:00:00Z");
    const found = findNextSalaryDay(origin, now);
    expect(found.toISO()).toEqual("2022-06-24T00:00:00.000+00:00");
  });

  it("runs forward to next month if closest 25th is in the past", () => {
    const now = DateTime.fromISO("2022-06-25T00:00:00Z");
    const origin = DateTime.fromISO("2022-06-25T00:00:00Z");
    const found = findNextSalaryDay(origin, now);
    expect(found.toISO()).toEqual("2022-07-25T00:00:00.000+00:00");
  });
});
