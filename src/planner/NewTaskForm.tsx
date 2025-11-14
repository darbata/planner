import {useContext, useState} from "react";
import "./styles/new-task-form.css";
import {TasksDispatchContext} from "./TasksProvider.tsx";

export function NewTaskForm({date} : {date: string}) {

    const dispatch = useContext(TasksDispatchContext);

    const [newTaskDescription, setNewTaskDescription] = useState<string>("");



    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        dispatch(
            {
                type: "CREATE_TASK",
                payload: {
                    date: date,
                    newTaskDescription: newTaskDescription
                }
            }
        )
        setNewTaskDescription("");
    }

    return (
        <form className={"new-task-form"} onSubmit={handleSubmit}>
            <input
                className={"new-task-form__input"}
                type="text"
                value={newTaskDescription}
                onChange={(event) =>
                    setNewTaskDescription(event.target.value)
                }
            />
        </form>
    )
}