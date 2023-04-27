import React from "react";
import axios from 'axios';
import { hookContext } from "../../App.js";
const vals = require('../../routing_info.js');

export const CreateTask = () => {
  const { setTaskList, taskType, taskList, session } = React.useContext(hookContext);
  const handleSubmit = async (e) => {
    try {
      const task = document.getElementById('taskInput').value;
      if (task) {
        const config = {
          headers: {
            'Authorization': `Bearer ${session}`
          }
        }
        const body = {
          'listName': taskType,
          'content': {
            item: task
          }
        }
        const response = await axios.post(`${vals.root}/api/list`, body, config);
        console.log(response);
        if (response.status === 201) {
          console.log("Worked")
          let temp = [...taskList]
          temp.push(response.data)
          setTaskList(temp)
        }
        document.getElementById('taskInput').value = "";
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') { handleSubmit(e) }
  };

  return (
    <div className="flex createTask">
      <input type="text" id="taskInput" placeholder="Task to complete" onKeyUp={handleKeyUp} />
      <button className="button" onClick={handleSubmit}>Add to List!</button>
    </div>
  );
}
