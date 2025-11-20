"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
var axios_1 = require("axios");
function createTask(userId, description, date) {
    var newTask = {
        userId: userId,
        description: description,
        date: date
    };
    axios_1.default.post("http://localhost:8080/api/tasks", newTask)
        .then(function (res) { return console.log(res.data); })
        .catch(function (err) { return console.error(err); });
}
createTask("691d62bbe76dee281445f40b", "a task from the frontend", new Date("2025-11-25"));
