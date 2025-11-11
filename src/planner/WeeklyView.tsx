import {useEffect, useState} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {Day} from "./Day.tsx";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";
import {createNewTask} from "../services/createNewTask.ts";
import {v4 as uuidv4} from 'uuid';

// must fetch all the tasks given the list of dates to fetch for
export function WeeklyView({ dates }: { dates: string[] }) {
    const [tasks, setTasks] = useState<Record<string, taskModel[]>>({});

    useEffect(() => {
        setTasks(() => {
            const newTasks: Record<string, taskModel[]> = {};

            dates.forEach((date) => {
                newTasks[date] = [];

                // place in some sample tasks
                for (let i = 1; i < 4; i++) {
                    newTasks[date].push({
                        id: uuidv4(),
                        order: i,
                        description: `super cool and important task ${i}`,
                        isComplete: false
                    })
                }
            });

            return newTasks;
        });
    }, [dates]);

    function findTaskDate(id : string) : string | undefined {

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

        const fromDate : string | undefined = findTaskDate(active.id.toString());

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

    function addTask(date : string, description : string) : void {

        const newTask = createNewTask(description, tasks[date].length);

        // add new task to the bottom of the list associated with the date
        setTasks((prev) => ({
            ...prev,
            [date]: [...(prev[date] || []), newTask]
        }))

    }

    return (
        <DndContext onDragEnd={handleDragEnd} >
            {dates.map((date) => (
                <Day key={date} date={date} tasks={tasks[date]} addTask={addTask}/>
            ))}
        </DndContext>
    );
}