import React from 'react';
import {hookContext} from "../../App.js"

export const ListItem = ({task, date, className}) => {
  const {setTaskList, taskType, taskList} = React.useContext(hookContext);
  const handleDelete = (task) => {
  
  const temp = [...taskList];
  temp.splice(temp.indexOf(temp.find(item => item.task === task)), 1);
  localStorage.setItem(taskType, JSON.stringify(temp));
  setTaskList(temp);
  }
  return (
    <tr className={`listItem ${className}`}>
      <td className="task">{task}</td>
      {taskType === "todo" ? <td className="date">{date}</td> : <></>}
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, task, date)}>Remove</button></td>
    </tr>
  )
}
