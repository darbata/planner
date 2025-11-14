import {v4 as uuidv4} from "uuid";
import {createContext, type Dispatch, type ReactNode, useReducer} from "react";
import type {taskModel} from "../services/firebase/taskModel.ts";
import {createNewTask} from "../services/createNewTask.ts";

export const TasksContext = createContext<Record<string, taskModel[]>>({});
export const TasksDispatchContext =
    createContext<Dispatch<TaskAction>>(() => {});

export function TasksProvider({ children } : {
    children: ReactNode
}) {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    )

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    )
}

export type TaskAction =
    | { type: "APPEND_TASK"; payload: { newDate: string; task: taskModel } }
    | { type: "REMOVE_TASK"; payload: { date: string; taskId: string } }
    | { type: "UPDATE_TASK"; payload: { date: string; task: taskModel } }
    | { type: "CREATE_TASK"; payload: { date: string; newTaskDescription: string}}

function tasksReducer(
    state: Record<string, taskModel[]>,
    action: TaskAction
): Record<string, taskModel[]> {
    switch (action.type) {
        case "APPEND_TASK": { const {newDate, task} = action.payload;
            console.log(newDate);
            const prevDate = task.date;

            const newState = {...state};

            if (prevDate && state[prevDate]) {
                newState[prevDate] = state[prevDate].filter(t => t.id !== task.id);
            }

            task.date = newDate;

            newState[newDate] = newState[newDate]
                ? [...newState[newDate], { ...task, order: newState[newDate].length + 1 }]
                : [{ ...task, order: 1 }];

            return newState;
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
        case "CREATE_TASK": {
            const {date, newTaskDescription} = action.payload;

            const newTask = createNewTask(date, newTaskDescription, state[date].length + 1);

            return {
                ...state,
                [date]: state[date] ? [...state[date], newTask] : [newTask]
            }
        }
        default: {
            return state;
        }
    }
}

const initialTasks = {
    "Mon Nov 10 2025": [
        {id: uuidv4(), date: "Mon Nov 10 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Mon Nov 10 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Mon Nov 10 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Tue Nov 11 2025": [
        {id: uuidv4(), date: "Tue Nov 11 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Tue Nov 11 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Tue Nov 11 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Wed Nov 12 2025": [
        {id: uuidv4(), date: "Wed Nov 12 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Wed Nov 12 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Wed Nov 12 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Thu Nov 13 2025": [
        {id: uuidv4(), date: "Thu Nov 13 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Thu Nov 13 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Thu Nov 13 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Fri Nov 14 2025": [
        {id: uuidv4(), date: "Fri Nov 14 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Fri Nov 14 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Fri Nov 14 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Sat Nov 15 2025": [
        {id: uuidv4(), date: "Sat Nov 15 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Sat Nov 15 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Sat Nov 15 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ],
    "Sun Nov 16 2025": [
        {id: uuidv4(), date: "Sun Nov 16 2025", order: 1, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Sun Nov 16 2025", order: 2, description: "super cool and important task lol", isComplete: false},
        {id: uuidv4(), date: "Sun Nov 16 2025", order: 3, description: "super cool and important task lol", isComplete: false},
    ]
}