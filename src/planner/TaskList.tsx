import {useDroppable} from "@dnd-kit/core";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";

export function TaskList({date, tasks} : {
    date: string,
    tasks: taskModel[]
}) {

    const {setNodeRef} = useDroppable({
        id: date
    })

    return (
        <div ref={setNodeRef}>
            <ul>
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <Task key={task.id}
                              id={task.id}
                              description={task.description}
                              isComplete={task.isComplete}
                        />
                    )
                }
            </ul>
        </div>
    )

}