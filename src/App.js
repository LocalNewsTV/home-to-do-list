import React from 'react';
import {CreateTask} from './components/CreateTask/CreateTask.js';
import {NoTasks} from './components/NoTasks/NoTasks.js';
import {TaskList} from './components/TaskList/TaskList.js';
import {NavBar} from './components/NavBar/NavBar.js';
import './components/NavBar/NavBar.css';
import './components/ListItem/ListItem.css';
import './components/TaskList/TaskList.css';
import './components/CreateTask/CreateTask.css';
import './components/NoTasks/NoTasks.css';
import './App.css';
const vals = require('./routing_info.js');

export const hookContext = React.createContext();

function App() { 

  const [taskType, setTaskType] = React.useState("todo")
  const [taskList, setTaskList] = React.useState([]);
  React.useEffect(() => {
    (async() => {
      fetch(vals.get[taskType], { method: "GET" })
      .then((data) => data.json())
      .then((json) => {
        setTaskList(json);
      })
      .catch(error => {
        const sampleDate = (new Date()).toDateString();
        const sampleTask = "Sample Task"
        const sampleList = [
          {task: sampleTask, date: sampleDate},
          {task: sampleTask, date: sampleDate},
          {task: sampleTask, date: sampleDate},
        ];
        setTaskList(sampleList);
      })
    })();
  }, [taskType]);

  return (
    <hookContext.Provider value={{taskList, setTaskList, taskType, setTaskType}}>
      <NavBar />
      <div className="App">
        <header className="App-header">
          {taskList.length === 0
          ? <NoTasks />
          : <TaskList />}
          <CreateTask />
        </header>
      </div>
    </hookContext.Provider>
  );
}

export default App;
