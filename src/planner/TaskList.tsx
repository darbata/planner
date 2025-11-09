import {data} from "../services/firebase/data.ts";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {restrictToParentElement, restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useState} from "react";
import {SortableItem} from "./components/SortableItem.tsx";
import {Task} from "./Task.tsx";
import type {DragEndEvent} from "@dnd-kit/core";

export function TaskList() {
    const [tasks, setTasks] = useState<taskModel[]>(data);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        // not over anything
        if (!over) return;

        // same item
        if (active.id === over.id) return;

        const oldIndex = tasks.findIndex((t) => String(t.id) === String(active.id));
        const newIndex = tasks.findIndex((t) => String(t.id) === String(over.id));

        if (oldIndex === -1 || newIndex === -1) return;

        // Use arrayMove to create a new array (does not mutate original)
        setTasks((prev) => arrayMove(prev, oldIndex, newIndex));
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
            >
                {tasks.map(task =>
                    <SortableItem key={task.id} id={task.id}>
                        <Task description={task.description}></Task>
                    </SortableItem>
                )}
            </SortableContext>
        </DndContext>
    )
}