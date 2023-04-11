import React from 'react';
import {hookContext} from "../../App.js"

export const ListItem = ({task, date, id, className}) => {
  const {setTaskList, taskType, taskList} = React.useContext(hookContext);
  const handleDelete = (id) => {
  
  const temp = [...taskList];
  temp.splice(id, 1);
  localStorage.setItem(taskType, JSON.stringify(temp));
  setTaskList(temp);
  }
  return (
    <tr className={`listItem ${className}`}>
      <td className="task">{task}</td>
      {taskType === "todo" ? <td className="date">{date}</td> : <></>}
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, id)}>Remove</button></td>
    </tr>
  )
}
