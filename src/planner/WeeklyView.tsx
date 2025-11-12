import {Day} from "./Day.tsx";
import {DndContext, type DragEndEvent} from "@dnd-kit/core";
import {useReducer} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {v4 as uuidv4} from "uuid";
import {createNewTask} from "../services/createNewTask.ts";
import "./styles/weekly-view.css"

type ActionType =
    | { type: "ADD_TASK"; payload: { date: string; task: taskModel } }
    | { type: "REMOVE_TASK"; payload: { date: string; taskId: string } }
    | { type: "UPDATE_TASK"; payload: { date: string; task: taskModel } };

function reducer(
    state: Record<string, taskModel[]>,
    action: ActionType
): Record<string, taskModel[]> {
    switch (action.type) {
        case "ADD_TASK": { const {date, task} = action.payload;
            task.order = state[date].length + 1;
            return {
                ...state,
                [date]: state[date] ? [...state[date], task] : [task]
            };
        }
        case "REMOVE_TASK": {
            const {date, taskId} = action.payload;
            return {
                ...state,
                [date]: state[date]?.filter(task => task.id !== taskId) || []
            };
        }
        case "UPDATE_TASK": {
            const {date, task} = action.payload;
            return {
                ...state,
                [date]: state[date]?.map(oldTask => (oldTask.id === task.id ? task : oldTask)) || [task]
            };
        }
        default: {
            return state;
        }
    }
}

// must fetch all the tasks given the list of dates to fetch for
export function WeeklyView({ dates, currentDate }: {
    dates: string[], currentDate: string
}) {
    const [state, dispatch] = useReducer(reducer, {
        "Mon Nov 10 2025": [
            {id: uuidv4(), date: dates[0], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[0], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[0], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Tue Nov 11 2025": [
            {id: uuidv4(), date: dates[1], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[1], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[1], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Wed Nov 12 2025": [
            {id: uuidv4(), date: dates[2], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[2], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[2], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Thu Nov 13 2025": [
            {id: uuidv4(), date: dates[3], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[3], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[3], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Fri Nov 14 2025": [
            {id: uuidv4(), date: dates[4], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[4], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[4], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Sat Nov 15 2025": [
            {id: uuidv4(), date: dates[5], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[5], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[5], order: 3, description: "super cool and important task lol", isComplete: false},
        ],
        "Sun Nov 16 2025": [
            {id: uuidv4(), date: dates[6], order: 1, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[6], order: 2, description: "super cool and important task lol", isComplete: false},
            {id: uuidv4(), date: dates[6], order: 3, description: "super cool and important task lol", isComplete: false},
        ]
    })

    function addTask(date: string, newTask: taskModel) {
        dispatch({
            type: "ADD_TASK",
            payload: {
                date: date,
                task: newTask
            }
        })
    }

    function removeTask(date: string, taskId: string) {
        dispatch({
            type: "REMOVE_TASK",
            payload: {
                date: date,
                taskId: taskId
            }
        })
    }

    function createTask(date: string, order: number, taskDescription: string) {
        const newTask = createNewTask(date, taskDescription);
        newTask.order = order;
        addTask(date, newTask);
    }

    // function updateTask(date: string, updatedTask: taskModel) {
    //     dispatch({
    //         type: "UPDATE_TASK",
    //         payload: {
    //             date: date,
    //             task: updatedTask
    //         }
    //     })
    // }

    function handleDragEnd(event : DragEndEvent) {
        console.log(event.active);
        console.log(event.over);

        if (!event || !event.active || !event.over) return;

        const task : taskModel | undefined = event?.active?.data?.current?.task;

        // have task in memory
        if (task == undefined) return;

        // delete from its old date
        removeTask(task.date, task.id);

        // updates its date
        const newDate = event?.over?.data?.current?.date;

        task.date = newDate;
        // add to the new date

        addTask(newDate, task);
    }

    return (
        <DndContext  onDragEnd={handleDragEnd} >
            <div className={"weekly-view"}>
                {dates.map((date) => (
                    <Day
                        key={date}
                        date={date}
                        tasks={state[date]}
                        createTask={createTask}
                        isCurrentDate={currentDate === date}
                    />
                ))}
            </div>
        </DndContext>
    );
}