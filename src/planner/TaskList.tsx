import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";

export function TaskList({date, tasks} : {
    tasks: taskModel[],
    date: string
}) {


    return (
        <div className={`task-list`} >
            <ul className={"task_list__entries"}>
                {tasks ? tasks
                    .map(task =>
                        <div key={task.id} className={"task-list__entry"}>
                            <Task key={task.id} task={task}/>
                            <hr/>
                        </div>
                    )
                     : null
                }
                <div className={"task-list__entry"}>
                    <NewTaskForm date={date} />
                    <hr/>
                </div>
            </ul>
        </div>
    )

}