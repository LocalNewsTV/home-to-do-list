import React from 'react';
import {hookContext} from "../../App.js"
const vals = require('../../routing_info.js');

export const ListItem = ({task, date}) => {
  const {setTaskList} = React.useContext(hookContext);
  const handleDelete = (task) => {
    const data = JSON.stringify({"task": task});
    fetch(vals.delete,{
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
      <td className="date">{date}</td>
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, task)}>Task Complete</button></td>
    </tr>
  )
}
