import {useEffect, useState} from "react";
import "./styles/planner.css"
import {WeeklyView} from "./WeeklyView.tsx";

function addDays(date : Date, days :number) : Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function Planner() {
    const [offset, setOffset] = useState<number>(0);

    const [visibleDates, setVisibleDates] = useState<string[] | undefined>(undefined);

    useEffect(() => {

        // Find Monday
        let timestamp = new Date();

        // add the offset to the date
        timestamp = addDays(timestamp, 7 * offset);

        // Set date to the previous Monday
        const days_from_monday = timestamp.getDay() - 1;
        timestamp.setDate(timestamp.getDate() - days_from_monday);

        // create a list of days in this week, starting from monday
        const newVisibleDates : string[] = []

        for (let i = 0; i < 7; i++) {
            // "Mon Nov 10 2025"
            newVisibleDates.push(addDays(timestamp, i).toDateString());
        }

        setVisibleDates(newVisibleDates);
    }, [offset])

    if (visibleDates === undefined) return <div>Loading...</div>

    return (
        <section>
            <div className={"planner__header"}>
                <div className={"planner__date"}>
                    <h2 className={"planner__month"}>{visibleDates[0].split(' ')[1]}</h2>
                    <h2 className={"planner__year"}>{visibleDates[0].split(' ')[3]}</h2>
                </div>
                <div className={"planner__controls"}>
                    <button className={"planner__button planner__button-prev"} onClick={() => setOffset(offset - 1)}>
                        <img src="/arrow_left.svg" alt="previous week"/>
                    </button>
                    <button className={"planner__button planner__button-next"} onClick={() => setOffset(offset + 1)}>
                        <img src="/arrow_right.svg" alt="next week"/>
                    </button>
                </div>
            </div>
            <WeeklyView dates={visibleDates}/>
        </section>
    )
}