import {useDroppable} from "@dnd-kit/core";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import {useState} from "react";

export function TaskList({date, tasks, createNewTask} : {
    date: string,
    tasks: taskModel[],
}) {

    const [newTaskInput, setNewTaskInput] = useState<string>("");

    const {setNodeRef} = useDroppable({
        id: date
    })

    function handleSubmit() {
        console.log(newTaskInput);
        setNewTaskInput("");
    }

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
            <form action={handleSubmit}>
                <input
                    type="text"
                    value={newTaskInput}
                    onChange={(event) =>
                        setNewTaskInput(event.target.value)
                    }
                    onSubmit={handleSubmit}
                />
                <button type={"submit"}>Submit</button>
            </form>

        </div>
    )

}