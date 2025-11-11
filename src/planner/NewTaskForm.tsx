import {useState} from "react";

export function NewTaskForm({createTask} : {
    createTask: (taskDescription: string) => void;
}) {

    const [newTaskDescription, setNewTaskDescription] = useState<string>("");

    function handleSubmit() {
        createTask(newTaskDescription)
        setNewTaskDescription("");
    }

    return (
        <form action={handleSubmit}>
            <input
                type="text"
                value={newTaskDescription}
                onChange={(event) =>
                    setNewTaskDescription(event.target.value)
                }
            />
            <button type={"submit"}>Submit</button>
        </form>
    )
}