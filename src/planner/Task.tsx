import './styles/task.css'
import {useEffect, useRef, useState} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {FaRegCircle} from "react-icons/fa";
import {FaRegCheckCircle} from "react-icons/fa";
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export function Task({task} : {task: taskModel})  {

    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        const el = ref.current;
        return draggable({
            element: el,
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
        });
    }, [])

    const [complete, setComplete] = useState(task.isComplete);

    return (
        <div
            className={`task ${dragging && "task--dragging"}`}
            ref={ref}
        >
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
        </div>
    )
}