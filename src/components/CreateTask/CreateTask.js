import React from "react";
import {hookContext} from "../../App.js";

export const CreateTask = () => {
  const { setTaskList, taskType, taskList } = React.useContext(hookContext);
  const handleSubmit = (e) => {
    const task = document.getElementById('taskInput').value;
    if(task){
      const listOfItems = taskList;

      const date = (new Date()).toDateString();
      const data = JSON.stringify({task: task, date: date});

      listOfItems.push(data);
      localStorage.setItem(taskType, JSON.stringify(listOfItems));

      document.getElementById('taskInput').value = "";

      setTaskList(listOfItems);
      console.log("Heyyy", listOfItems);
    }
  }
  const handleKeyUp = (e) => {
    if(e.key === 'Enter')
      {handleSubmit(e)}
  };

  return (
    <div className="flex createTask">
      <input type="text" id="taskInput" placeholder="Task to complete" onKeyUp={handleKeyUp} />
      <button className="button" onClick={handleSubmit}>Add to List!</button>
    </div>
  );
}
