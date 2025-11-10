import {useEffect, useState} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Day} from "./Day.tsx";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";

// must fetch all the tasks given the list of dates to fetch for
export function WeeklyView({ dates }: { dates: string[] }) {
    const [tasks, setTasks] = useState<Record<string, taskModel[]>>({});

    useEffect(() => {
        let idCounter = 0;
        setTasks(() => {
            const newTasks: Record<string, taskModel[]> = {};

            dates.forEach((date) => {
                newTasks[date] = [];

                // place in some sample tasks
                for (let i = 1; i < 4; i++) {
                    newTasks[date].push({
                        id: idCounter++,
                        order: i,
                        description: `super cool and important task ${i}`,
                        isComplete: false
                    })
                }
            });

            return newTasks;
        });
    }, [dates]);

    console.log(tasks)

    function findTaskDate(id) : string | undefined {

        for (const date in tasks) {
            const list = tasks[date];
            const index = list.findIndex((task : taskModel) => task.id === id);

            if (index !== -1) {
                return date;
            }

        }

        return undefined;
    }

    function handleDragEnd(event : DragEndEvent) {
        const {active, over} = event;

        if (!over || !active) return;

        const toDate = over.id;

        const fromDate : string = findTaskDate(active.id);

        if (!fromDate) return;
        if (fromDate == toDate) return;

        setTasks((prev) => {
            const activeTaskIndex = prev[fromDate].findIndex(task => task.id === active.id);
            const activeTask = prev[fromDate][activeTaskIndex];

            const newFromList = [...prev[fromDate]];

            // delete task from old list
            newFromList.splice(activeTaskIndex, 1);

            // add task to new list
            const newToList = [...prev[toDate], activeTask];

            return {
                ...prev,
                [fromDate]: newFromList,
                [toDate]: newToList,
            }
        })

    }

    return (
        <DndContext onDragEnd={handleDragEnd} on>
            {dates.map((date) => (
                <Day key={date} date={date} tasks={tasks[date]}/>
            ))}
        </DndContext>
    );
}