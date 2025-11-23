import {useState} from "react";
import "./styles/new-task-form.css";
import {createTask} from "../services/api/users.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export function NewTaskForm({date} : {date: Date}) {
    const [newTaskDescription, setNewTaskDescription] = useState<string>("");

    const queryClient = useQueryClient();

    // todo: make use of useOptimistic for responsive UI :)
    const createTaskMutation = useMutation({
        mutationFn: ({ userId, description, date }: { userId: string, description: string, date: Date }) =>
            createTask(userId, description, date),
        onSuccess: () => {
            // Invalidate tasks cache to refetch after creating a new task
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            setNewTaskDescription("");
        },
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        createTaskMutation.mutate({
            userId: "691d62bbe76dee281445f40b",
            description: newTaskDescription,
            date: date,
        });
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