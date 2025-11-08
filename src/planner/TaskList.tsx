import {data} from "../services/firebase/data.ts";
import {Task} from "./Task.tsx";

export function TaskList() {

    return <ul>
        {data.map((task) =>
            <div>
                <Task description={task.description} />
                {/*<hr />*/}
            </div>
        )}
        {/*input*/}
    </ul>
}