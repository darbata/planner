import {Day} from "./Day.tsx";
import "./styles/weekly-view.css"
import {TasksProvider} from "./TasksProvider.tsx";


// must fetch all the tasks given the list of dates to fetch for
export function WeeklyView({ dates, currentDate }: {
    dates: string[], currentDate: string
}) {

    return (
        <TasksProvider>
            <div className={"weekly-view"}>
                {dates.map((date) => (
                    <Day
                        key={date}
                        date={date}
                        isCurrentDate={currentDate === date}
                    />
                ))}
            </div>
        </TasksProvider>
    );
}