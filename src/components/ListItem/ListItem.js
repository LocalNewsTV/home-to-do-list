import React from 'react';
import {hookContext} from "../../App.js"
const vals = require('../../routing_info.js');

export const ListItem = ({task, date}) => {
  const {setTaskList, taskType, taskList} = React.useContext(hookContext);
  const handleDelete = (task) => {
    const data = JSON.stringify({"task": task, "date": date});
    fetch(vals.delete[taskType],{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data
    })
    .then((response) => response.json())
    .then((data) => {
      setTaskList(data);
    })
    .catch(ex => {
      const temp = [...taskList];
      temp.splice(temp.indexOf(temp.find(item => item.task === task)), 1);
      setTaskList(temp);
    })
  }
  return (
    <tr className="listItem">
      <td className="task">{task}</td>
      {taskType === "todo" ? <td className="date">{date}</td> : <></>}
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, task, date)}>Remove</button></td>
    </tr>
  )
}
