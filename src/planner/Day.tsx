import './styles/day.css'
import {TaskList} from "./TaskList.tsx";
import {useContext} from "react";
import {TasksContext} from "./TasksProvider.tsx";

export function Day({date, isCurrentDate} : {
    date: string,
    isCurrentDate: boolean;
}) {

    const tasks = useContext(TasksContext);

    return (
        <div className={"day"}>
            <div className={`day__header ${isCurrentDate ? "day__header--current" : ""}` }>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.split(' ')[2]}</h3>
                    <h3 className={"day__month"}>{date.split(' ')[1]}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.split(' ')[0]}</h4>
            </div>
            <hr className={`day__rule ${isCurrentDate ? "day__rule--current" : ""}`}/>
            <TaskList date={date} tasks={tasks ? tasks[date] : []}/>
        </div>
    )
}