import React from 'react';
import {hookContext} from "../../App.js";

import {ListItem} from '../ListItem/ListItem.js'
export const TaskList = () => {
  const {taskList} = React.useContext(hookContext);
  const handleExport = () => {
    let copyString = ""
    for(const data of taskList){
      copyString += `${data.task}\n`;
    }
    navigator.clipboard.writeText(copyString);
  }

  return (
    <>
      <h1>Let's Get to Work!</h1>
      <table className="taskList">
        <thead>
          <tr>
            <th className="header">Task</th>
            <th className="header">Date Posted</th>
          </tr>
        </thead>
        <tbody>
            {taskList.map((data, index) => {
              return <ListItem {...data} key={index} />
            })}
        </tbody>
      </table>
      <input type="button" className="exportToClipboard" value="Export to Clipboard" onClick={handleExport} />
    </>
  );
}