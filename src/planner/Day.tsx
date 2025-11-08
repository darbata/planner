import './styles/day.css'
import {TaskList} from "./TaskList.tsx";

type props = {
    date: Date
}

export function Day({date} : props) {
    return (
        <div className={"day"}>
            <div className={"day__header"}>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.getDate()}</h3>
                    <h3 className={"day__month"}>{date.toLocaleString('default', {month: 'short'})}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.toLocaleString('default', {weekday: 'short'})}</h4>
            </div>
            <hr/>
            <TaskList />
        </div>
    )
}