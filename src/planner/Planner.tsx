import {Day} from "./Day.tsx";
import {type ReactNode, useEffect, useState} from "react";

function addDays(date : Date, days :number) : Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function Planner() {
    const [offset, setOffset] = useState<number>(0);
    const [visibleDates, setVisibleDates] = useState<Date[]>([new Date]);

    useEffect(() => {

        // Find Monday
        let timestamp = new Date();

        // add the offset to the date
        timestamp = addDays(timestamp, 7 * offset);

        // Set date to the previous Monday
        const days_from_monday = timestamp.getDay() - 1;
        timestamp.setDate(timestamp.getDate() - days_from_monday);

        // create a list of days in this week, starting from monday
        const newVisibleDates : Date[] = []

        for (let i = 0; i < 7; i++) {
            newVisibleDates.push(addDays(timestamp, i));
        }

        setVisibleDates(newVisibleDates);
    }, [offset])

    return (
        <section>
            <div className={"planner__header"}>
                <h2 className={"planner__header__month"}>{visibleDates[0].toLocaleString('default', {month: 'short'})}</h2>
                <button onClick={() => setOffset(offset - 1)}>previous week</button>
                <button onClick={() => setOffset(offset + 1)}>next week</button>
            </div>
            {visibleDates.map((date) : ReactNode =>
                <Day key={date.toString()} date={date} />
            )}
        </section>
    )

}