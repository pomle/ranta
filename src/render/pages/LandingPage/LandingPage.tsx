import React, { useCallback } from "react";
import { codecs, createQuery } from "@pomle/paths";
import { useQueryParams } from "@pomle/react-router-paths";
import Param from "./components/Param";
import "./LandingPage.css";

var formatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
});

const DEFAULT_INTEREST = 0.06;
const DEFAULT_SAVINGS = 1000;
const DEFAULT_YEARS = 30;

const query = createQuery({
  years: codecs.number,
  savings: codecs.number,
  interest: codecs.number,
});

export default function LandingPage() {
  const [params, setParams] = useQueryParams(query);

  const savings = params.savings[0] ?? DEFAULT_SAVINGS;
  const interest = params.interest[0] ?? DEFAULT_INTEREST;
  const years = params.years[0] ?? DEFAULT_YEARS;

  const setSavings = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const savings = parseFloat(event.target.value);
      setParams({
        savings: [savings],
      });
    },
    [setParams]
  );

  const setInterest = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const interest = parseFloat(event.target.value);
      setParams({
        interest: [interest],
      });
    },
    [setParams]
  );

  const setYears = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const years = parseFloat(event.target.value);
      setParams({
        years: [years],
      });
    },
    [setParams]
  );

  const events: { month: number; sum: number; log: React.ReactNode }[] = [];

  const months = years * 12;
  let sum = 0;
  for (let month = 1; month <= months; month += 1) {
    sum += savings;

    events.push({
      month,
      sum,
      log: <>Insättning {formatter.format(savings)}</>,
    });

    if (month % 12 === 0) {
      const extra = sum * (interest / 100);
      sum += extra;

      events.push({
        month,
        sum,
        log: <>Utdelning {formatter.format(extra)}</>,
      });
    }
  }

  return (
    <div className="LandingPage">
      <div className="sections">
        <section className="params">
          <div className="param">
            <Param caption="SEK / månad" value={savings.toFixed()} />
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={savings.toString()}
              onChange={setSavings}
            />
          </div>

          <div className="param">
            <Param caption="Ränta" value={<>{interest.toFixed(1)}%</>} />

            <input
              type="range"
              min={0.1}
              max={10}
              step={0.1}
              value={interest}
              onChange={setInterest}
            />
          </div>

          <div className="param">
            <Param caption="År" value={years.toFixed()} />

            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={years}
              onChange={setYears}
            />
          </div>
        </section>

        <section className="summary">
          <Param caption="Summa" value={formatter.format(sum)} />
        </section>

        <section className="events">
          <table>
            {events.map((event) => {
              return (
                <tr>
                  <td>{event.month}</td>
                  <td>{formatter.format(event.sum)}</td>
                  <td>{event.log}</td>
                </tr>
              );
            })}
          </table>
        </section>
      </div>
    </div>
  );
}
