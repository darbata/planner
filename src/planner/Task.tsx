import './styles/task.css'
import {useState} from "react";
import type {taskModel} from "../services/api/taskModel.ts";
import {FaRegCircle, FaRegCheckCircle} from "react-icons/fa";

export function Task({task} : {task: taskModel})  {
    const [complete, setComplete] = useState(task.isComplete);

    return (
        <div
            className={`task `}
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