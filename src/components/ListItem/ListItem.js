import React from 'react';
import {hookContext} from "../../App.js"
const vals = require('../../routing_info.js');

export const ListItem = ({task, date}) => {
  const {setTaskList, taskType} = React.useContext(hookContext);
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
    });
  }
  return (
    <tr className="listItem">
      <td className="task">{task}</td>
      {taskType === "todo" ? <td className="date">{date}</td> : <></>}
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, task, date)}>Remove</button></td>
    </tr>
  )
}
