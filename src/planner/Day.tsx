import './styles/day.css'
import {TaskList} from "./TaskList.tsx";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {useState} from "react";

export function Day({date, tasks, addTask} : {
    date : string,
    tasks: taskModel[],
    addTask: (date : string, newTaskInput : string) => void,
}) {

    const [newTaskInput, setNewTaskInput] = useState<string>("");

    if (tasks === undefined) {
        return <div>Loading...</div>
    }

    function handleSubmit() {

        addTask(date, newTaskInput);

        setNewTaskInput("");
    }

    return (
        <div className={"day"}>
            <div className={"day__header"}>
                <div className="day__date">
                    <h3 className={"day__date"}>{date.split(' ')[1]}</h3>
                    <h3 className={"day__month"}>{date.split(' ')[2]}</h3>
                </div>
                <h4 className={"day__weekday"}>{date.split(' ')[0]}</h4>
            </div>
            <hr/>
            <div className={"day__task_list"}>
                <TaskList date={date} tasks={tasks} />
            </div>
            <form action={handleSubmit}>
                <input
                    type="text"
                    value={newTaskInput}
                    onChange={(event) =>
                        setNewTaskInput(event.target.value)
                    }
                />
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}