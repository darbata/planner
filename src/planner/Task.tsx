import './styles/task.css'
import {useState} from "react";
import {useDraggable} from "@dnd-kit/core";
import * as React from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {FaRegCircle} from "react-icons/fa";
import {FaRegCheckCircle} from "react-icons/fa";

export function Task({task} : {task: taskModel})  {

    const [complete, setComplete] = useState(task.isComplete);

    const {listeners, setNodeRef, transform} = useDraggable({
        id: task.id,
        data: { task }
    })

    const style : React.CSSProperties = {
        // visually see drag of item
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    }


    return (
        <button className={"task"} ref={setNodeRef} {...listeners} style={style}>
            <div className={`task__description ${complete ? "task__description--complete" : ""}`}>
                {complete
                    ? <p><s>{task.description}</s></p>
                    : <p>{task.description}</p>
                }
            </div>
            <div onClick={() => setComplete(!complete)} className={"task__checkbox"}>
                {complete
                    ? <FaRegCheckCircle />
                    : <FaRegCircle />

                }
            </div>
        </button>
    )
}