import {useState} from "react";
import "./styles/new-task-form.css";

export function NewTaskForm({date} : {date: Date}) {

    console.log(date);

    const [newTaskDescription, setNewTaskDescription] = useState<string>("");

    function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

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