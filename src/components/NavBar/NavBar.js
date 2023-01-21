import React from 'react';
import {hookContext} from "../../App.js";

export const NavBar = () => {
  const {taskType, setTaskType} = React.useContext(hookContext);
  const handleClick = () => {
    setTaskType(taskType === "todo" ? "grocery" : "todo");
  }
  return (
  <div id="nav">
    <div className="nav-left">
      <ul>
        <a className="navLink" href="https://github.com/LocalNewsTV/home-to-do-list">Repo</a>
        <a className="navLink" href="https://github.com/LocalNewsTV">GitHub</a>
        <a className="navLink" href="https://LocalNewsTV.github.io/">Portfolio</a>
        <span className="navLink" onClick={handleClick}>{taskType === "todo" ? "Groceries" : "Tasks"}</span>
      </ul>
    </div>
  </div>
  )
}