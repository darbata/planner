import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";
import {useEffect, useRef, useState} from "react";
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export function TaskList({date, tasks} : {
    tasks: taskModel[],
    date: string
}) {

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
        const el = ref.current;

        return dropTargetForElements({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({source}) => {
                console.log(source);
                setIsDraggedOver(false)
            },
        });
    }, []);



    return (
        <div ref={ref} className={`task-list ${isDraggedOver && "task-list--dragged-over"}`} >
            <ul className={"task_list__entries"}>
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
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