import {Day} from "./Day.tsx";
import "./styles/weekly-view.css"

export function WeeklyView({ dates, currentDate }: {
    dates: Date[], currentDate: Date | undefined
}) {
    return (
        <div className={"weekly-view"}>
            {dates.map((date) => {
                const day = date.toLocaleDateString('default', {weekday: "short"}).toLowerCase();
                return (
                <div className={`day-container day-container--${day}`}>
                    <Day
                        key={date.toDateString()}
                        date={date}
                        isCurrentDate={currentDate === date}
                    />
                </div>
            )})}
        </div>
    );
}

// column based