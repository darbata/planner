import './styles/task.css'
import {useEffect, useRef, useState} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {FaRegCircle, FaRegCheckCircle} from "react-icons/fa";
import {draggable, dropTargetForElements} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {combine} from "@atlaskit/pragmatic-drag-and-drop/combine";

export function Task({task} : {task: taskModel})  {

    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);




    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // already returns clean up function
        return combine(

            draggable({
                element: el,
                getInitialData: () => ({task}),
                onDragStart: () => setDragging(true),
                onDrop: () => setDragging(false),
            }),

            dropTargetForElements({
                element: el,
                getData: () => ({task}),
                onDrop: ({source, self, location}) => {
                    console.log("source")
                    console.log(source)
                    console.log("self")
                    console.log(self)
                    console.log("location")
                    console.log(location)
                }
            })
        )

    }, [task])

    const [complete, setComplete] = useState(task.isComplete);

    return (
        <div
            className={`task `}
        >
            <div ref={ref}  className={`${dragging && "task__description--dragging"} task__description ${complete ? "task__description--complete" : ""}`}>
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