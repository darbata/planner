import './styles/task.css'
import {useState} from "react";

type TaskProps = {
    description: string,
    isComplete?: boolean
}

export function Task({description, isComplete} : TaskProps) {

    const [complete, setComplete] = useState(isComplete);

    return (
        <div className={"task"}>
            <p className={`task__description ${complete ? "task__description--complete" : ""}`}>
                {complete
                    ? <p><s>{description}</s></p>
                    : <p>{description}</p>
                }
            </p>
            <div onClick={() => setComplete(!complete)} className={"task__checkbox"}>
                {complete ?
                    <img src="/circle_check.svg" alt="completed item"/> :
                    <img src="/circle_blank.svg" alt="incomplete item"/>
                }
            </div>
        </div>
    )
}