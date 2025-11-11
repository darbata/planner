import './styles/day.css'
import {TaskList} from "./TaskList.tsx";
import {NewTaskForm} from "./NewTaskForm.tsx";

export function Day({date} : {
    date : string,
}) {

    return (
        <div className={"day"}>
            <div className={"day__header"}>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.split(' ')[1]}</h3>
                    <h3 className={"day__month"}>{date.split(' ')[2]}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.split(' ')[0]}</h4>
            </div>
            <hr/>
            <TaskList date={date} />
            <NewTaskForm />
        </div>
    )
}