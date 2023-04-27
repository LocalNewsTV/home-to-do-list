import React from 'react';
import { hookContext } from "../../App.js"
import axios from 'axios';
const vals = require('../../routing_info.js');

export const ListItem = ({ task, date, className, id }) => {
  const { setTaskList, taskList, session } = React.useContext(hookContext);
  const handleDelete = async (deleteId) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${session}`
        },
        data: {
          "id": deleteId
        }
      }
      const response = await axios.delete(`${vals.root}/api/list`, config);
      console.log(response);
      if (response.status === 200) {
        const temp = [...taskList];
        temp.splice(temp.indexOf(temp.find(item => item.id === id)), 1);
        setTaskList(temp);
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <tr className={`listItem ${className}`}>
      <td className="task">{task}</td>
      <td className="date">{new Date(date).toDateString()}</td>
      <td className="delete"><button className="buttonDelete" onClick={handleDelete.bind(this, id)}>Remove</button></td>
    </tr>
  )
}
