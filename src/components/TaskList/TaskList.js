import React from 'react';
import {hookContext} from "../../App.js";

import {ListItem} from '../ListItem/ListItem.js'
export const TaskList = () => {
  const {taskList, taskType} = React.useContext(hookContext);
  const handleExport = () => {
    let copyString = ""
    for(const data of taskList){
      copyString += `${data.task}\n`;
    } 
    try {
      navigator.clipboard.writeText(copyString);
    } catch(ex) {
      alert("Writing to clipboard failed:\n" + copyString);
    }
  }

  return (
    <>
      <h1>{taskType === "todo" ? "Let's Get to Work!" : "Let's Get Shopping!"}</h1>
      <table className="taskList">
        <thead>
          <tr>
            <th className="header">Task</th>
            {taskType === "todo" ? <th className="header">Date Posted</th> : <></>}
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