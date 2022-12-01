import React from "react";
import {hookContext} from "../../App.js";
const vals = require('../../routing_info.js');

export const CreateTask = () => {
  const { setTaskList} = React.useContext(hookContext);
  const handleSubmit = (e) => {
    const task = document.getElementById('taskInput').value;
    if(task){
      const date = (new Date()).toDateString();
      const data = JSON.stringify({task: task, date: date});
      fetch(vals.create,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
      })
      .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
        document.getElementById('taskInput').value = "";
      });
    }
  }

  return (
    <div className="flex createTask">
      <input type="text" id="taskInput" placeholder="Task to complete" />
      <button className="button" onClick={handleSubmit}>Add to List!</button>
    </div>
  );
}
