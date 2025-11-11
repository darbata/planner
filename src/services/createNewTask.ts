import type {taskModel} from "./firebase/taskModel.ts";
import {v4 as uuidv4} from 'uuid';

export function createNewTask(date : string, description : string) : taskModel {
    return {
        date: date,
        description: description,
        id: uuidv4(),
        order: -1,
        isComplete: false
    };
}