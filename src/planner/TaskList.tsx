import type {taskModel} from "../services/api/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTasksByDate} from "../services/api/users.ts";
import {BlankTask} from "./BlankTask.tsx";

export function TaskList({date, length} : {
    date: Date;
    length: number;
}) {
    const {data, isLoading, error} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasksByDate(date)
    })

    if (isLoading) return <div>Loadding...</div>

    const blankTasks = Array.from({length: length - data.length}, (_, index) => (
        <div key={index} className={"task-list__entry"}>
            <BlankTask />
            <hr/>
        </div>
    ))


    return (
        <div className={`task-list`} >
            <ul className={"task_list__entries"}>
                {data
                    .map((task: taskModel) =>
                        <div key={task.id} className={"task-list__entry"}>
                            <Task key={task.id} task={task}/>
                            <hr/>
                        </div>
                    )
                }
                <div className={"task-list__entry"}>
                    <NewTaskForm date={date} />
                    <hr/>
                </div>
                {blankTasks}
            </ul>
        </div>
    )

}