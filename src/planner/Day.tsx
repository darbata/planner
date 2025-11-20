import './styles/day.css'
import {TaskList} from "./TaskList.tsx";

export function Day({date, isCurrentDate} : {
    date: Date,
    isCurrentDate: boolean;
}) {
    return (
        <div className={"day"}>
            <div className={`day__header ${isCurrentDate ? "day__header--current" : ""}` }>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.getDate()}</h3>
                    <h3 className={"day__month"}>{date.toLocaleString('default', {month: 'short'})}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.toLocaleString('default', {weekday: 'short'})}</h4>
            </div>
            <hr className={`day__rule ${isCurrentDate ? "day__rule--current" : ""}`}/>
            <TaskList date={date}/>
        </div>
    )
}