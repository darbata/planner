import {useDroppable} from "@dnd-kit/core";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";

export function TaskList({date, tasks} : {
    date: string,
    tasks: taskModel[]
}) {

    const {setNodeRef} = useDroppable({
        id: date,
        data: {
            date: date
        }
    })

    return (
        <div ref={setNodeRef}>
            <ul className={"day__task_list"}>
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <Task key={task.id} task={task}/>
                    )
                }
            </ul>


        </div>
    )

}