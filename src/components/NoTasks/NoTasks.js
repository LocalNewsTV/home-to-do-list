import React from 'react';
import {hookContext} from "../../App.js";

export const NoTasks = () => {
  const { taskType } = React.useContext(hookContext);
 return (
  <>{ taskType === "todo"  
    ? <h1 className="h1">All Tasks are Complete!</h1>
    : <h1 className="h1">Nothing to shop for?</h1>
    }
    <h6>You can change that by adding to your list</h6>
  </>);
}