import {useState} from "react";

export function NewTaskForm({addTask} : {
    addTask?: (date: string, newTaskDescription: string) => void;
}) {

    const [newTaskInput, setNewTaskInput] = useState<string>("");

    function handleSubmit() {
        // addTask(date, newTaskInput);
        setNewTaskInput("");
    }

    return (
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
    )
}