import type {taskModel} from "../services/api/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTasksByDate} from "../services/api/users.ts";

export function TaskList({date} : {
    date: Date
}) {

    const {data, isLoading, error} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasksByDate(date)
    })

    if (isLoading) return <div>Loading...</div>

    console.log(data);

    if (error) {
        console.log(error);
        return <div>Error</div>
    }

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
            </ul>
        </div>
    )

}