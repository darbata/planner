import {Day} from "./Day.tsx";
import "./styles/weekly-view.css"

export function WeeklyView({ dates, currentDate }: {
    dates: Date[], currentDate: Date | undefined
}) {
    return (
        <div className={"weekly-view"}>
            {dates.map((date) => (
                <Day
                    key={date.toDateString()}
                    date={date}
                    isCurrentDate={currentDate === date}
                />
            ))}
        </div>
    );
}