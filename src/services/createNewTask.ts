import type {taskModel} from "./firebase/taskModel.ts";
import {v4 as uuidv4} from 'uuid';

export function createNewTask(description : string, order : number) : taskModel {
    return {
        description: description,
        id: uuidv4(),
        order: order,
        isComplete: false
    };
}