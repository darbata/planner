import {data} from "../services/firebase/data.ts";

export function TaskList() {
    console.log(data[0])
    return <ul>
        {data.map((task) =>
            <li>{task.description}</li>
        )}
    </ul>
}