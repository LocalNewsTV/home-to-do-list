import React from 'react';
import {CreateTask} from './components/CreateTask/CreateTask.js';
import {NoTasks} from './components/NoTasks/NoTasks.js';
import {TaskList} from './components/TaskList/TaskList.js';
import './components/ListItem/ListItem.css';
import './components/TaskList/TaskList.css';
import './components/CreateTask/CreateTask.css';
import './components/NoTasks/NoTasks.css';
import './App.css';


export const hookContext = React.createContext();

function App() {
  const [taskList, setTaskList] = React.useState([]);
  React.useEffect(() => {
    (async() => {
      fetch("http://10.0.0.61:3001/fetchTasks", { method: "GET" })
      .then((data) => data.json())
      .then((json) => {
        setTaskList(json);
      });
    })();
  }, []);

  return (
    <hookContext.Provider value={{taskList, setTaskList}}>
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
