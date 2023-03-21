import React from 'react';
import {hookContext} from "../../App.js";

import {ListItem} from '../ListItem/ListItem.js'
export const TaskList = () => {
  const {taskList, taskType} = React.useContext(hookContext);
  const handleExport = () => {
    let copyString = ""
    for(const data of taskList){
      const task = JSON.parse(data);
      copyString += `${task.task},\n`;
    } 
    try {
      navigator.clipboard.writeText(copyString);
    } catch(ex) {
      alert("Writing to clipboard failed:\n" + copyString + "\n You are seeing this alert because you're running this page on a non-HTTPS connection");
    }
  }

  return (
    <>
      <h1>{taskType === "todo" ? "Let's Get to Work!" : "Let's Get Shopping!"}</h1>
      <table className="taskList">
        <thead className={"listTableHead"}>
          <tr className={"listHeadRow"}>
            <th className="header">Task</th>
            {taskType === "todo" ? <th className="header date">Date Posted</th> : <th>&nbsp;</th>}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody className={"listTableBody"}>
            {taskList.map((data, index) => {
              return <ListItem {...JSON.parse(data)} key={index} className={index % 2 === 0 ? "darker" : ""}/>
            })}
        </tbody>
      </table>
      <input type="button" className="exportToClipboard" value="Export to Clipboard" onClick={handleExport} />
    </>
  );
}