import {useDroppable} from "@dnd-kit/core";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import {useState} from "react";
import {v4 as uuidv4} from "uuid";

export function TaskList({date} : {
    date: string
}) {

    const [tasks, setTasks] = useState<taskModel[]>([
        {id: uuidv4(), date: date, order: 1, description: "super cool and important task", isComplete: false},
        {id: uuidv4(), date: date, order: 2, description: "super cool and important task", isComplete: false},
        {id: uuidv4(), date: date, order: 3, description: "super cool and important task", isComplete: false},
        {id: uuidv4(), date: date, order: 4, description: "super cool and important task", isComplete: false}
    ]);

    const {setNodeRef} = useDroppable({
        id: date
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