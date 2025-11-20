import axios from "axios";

export async function createTask(userId : string, description : string, date : Date) {
    const newTask = {
        userId: userId,
        description: description,
        date: date
    }

    const res = await axios.post("http://localhost:8080/api/tasks", newTask)
    return res.data;
}

export async function getTasksByDate(date : Date) {
    const d : string = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    console.log(d);
    const res = await axios.get(`http://localhost:8080/api/users/tasks?userId=691d62bbe76dee281445f40b&date=${d}`)
    return res.data;
}