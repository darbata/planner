import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";

export function TaskList({date, tasks, createTask} : {
    date: string,
    tasks: taskModel[]
    createTask: (date: string, order: number, taskDescription: string) => void;
}) {

    function dayCreateTask(taskDescription: string){
        createTask(date, tasks.length + 1, taskDescription);
        console.log(`Creating new task with order: ${tasks.length}`)
    }

    return (
        <div className={"task-list"} >
            <ul className={"task_list__entries"}>
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <div className={"task-list__entry"}>
                            <Task key={task.id} task={task}/>
                            <hr/>
                        </div>
                    )
                }
                <div className={"task-list__entry"}>
                    <NewTaskForm  createTask={dayCreateTask} />
                    <hr/>
                </div>
            </ul>
        </div>
    )

}