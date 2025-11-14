import type {taskModel} from "../services/firebase/taskModel.ts";
import {Task} from "./Task.tsx";
import "./styles/task-list.css"
import {NewTaskForm} from "./NewTaskForm.tsx";
import {useContext, useEffect, useRef, useState} from "react";
import {dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {TasksDispatchContext} from "./TasksProvider.tsx";

export function TaskList({date, tasks} : {
    tasks: taskModel[],
    date: string
}) {

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    const dispatch = useContext(TasksDispatchContext);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return dropTargetForElements({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            getData: () => ({date: date}),
            onDrop: ({source, self, location}) => {
                const innermost  = location.current.dropTargets[0];

                // dropped on element inside task list
                if (self.element !== innermost.element) {
                    console.log("Dropped on element inside task list");
                    return
                }

                console.log(self);

                // else dropped on task list
                const taskData = source.data as { task: taskModel };
                const taskListData = self.data as { date: string }

                dispatch({
                    type: "APPEND_TASK",
                    payload: {
                        newDate: taskListData.date,
                        task: taskData.task,
                    }
                })
            },
        });
    }, []);

    return (
        <div ref={ref} className={`task-list ${isDraggedOver && "task-list--dragged-over"}`} >
            <ul className={"task_list__entries"}>
                {tasks
                    .sort((a, b) => a.order - b.order)
                    .map(task =>
                        <div key={task.id} className={"task-list__entry"}>
                            <Task key={task.id} task={task}/>
                            <hr/>
                        </div>
                    )
                }
                <div className={"task-list__entry"}>
                    <NewTaskForm date={date} />
                    <hr/>
                </div>
            </ul>
        </div>
    )

}