import React from 'react';
import axios from 'axios';
import {CreateTask} from './components/CreateTask/CreateTask.js';
import {NoTasks} from './components/NoTasks/NoTasks.js';
import {TaskList} from './components/TaskList/TaskList.js';
import {NavBar} from './components/NavBar/NavBar.js';
import { LoginPage } from './components/LoginPage/LoginPage.js';
import './components/NavBar/NavBar.css';
import './components/ListItem/ListItem.css';
import './components/TaskList/TaskList.css';
import './components/CreateTask/CreateTask.css';
import './components/NoTasks/NoTasks.css';
import './components/LoginPage/LoginPage.css';
import './App.css';
const vals = require('./routing_info.js');

export const hookContext = React.createContext();

function App() { 
  const [session, setSession] = React.useState("");
  const [taskType, setTaskType] = React.useState("");
  const [taskList, setTaskList] = React.useState([]);
  React.useEffect(() => {
    (async() => {
      if(session && taskType) {
      const config = {
        headers: {
          'Authorization': `Bearer ${session}`
        },
      }
      const { data } = await axios.post(`${vals.root}/api/listItems`,{listName: taskType}, config);
      setTaskList(data);
    }
    })();
  }, [session, taskType]);

  return (
    <hookContext.Provider value={{taskList, setTaskList, taskType, setTaskType, session, setSession }}>
      <NavBar />
      <div className="App">
        <header className="App-header">
          {!session
          ? <LoginPage />
          : <>
              {taskList.length === 0
              ? <NoTasks />
              : <TaskList />}
              <CreateTask />
            </>
          }
        </header>
      </div>
    </hookContext.Provider>
  );
}

export default App;
