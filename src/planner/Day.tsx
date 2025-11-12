import './styles/day.css'
import {TaskList} from "./TaskList.tsx";
import type {taskModel} from "../services/firebase/taskModel.ts";

export function Day({date, tasks, createTask} : {
    date: string,
    tasks: taskModel[],
    createTask: (date: string, order: number, taskDescription: string) => void;
}) {



    return (
        <div className={"day"}>
            <div className={"day__header"}>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.split(' ')[2]}</h3>
                    <h3 className={"day__month"}>{date.split(' ')[1]}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.split(' ')[0]}</h4>
            </div>
            <hr/>
            <TaskList date={date} tasks={tasks ? tasks : []} createTask={createTask} />
        </div>
    )
}