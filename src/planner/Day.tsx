import './styles/day.css'
import {TaskList} from "./TaskList.tsx";
import {NewTaskForm} from "./NewTaskForm.tsx";
import type {taskModel} from "../services/firebase/taskModel.ts";

export function Day({date, tasks} : {
    date: string,
    tasks: taskModel[] | undefined;
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
            <TaskList date={date} tasks={tasks ? tasks : []} />
            <NewTaskForm />
        </div>
    )
}