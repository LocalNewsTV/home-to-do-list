import React from 'react';
import {hookContext} from "../../App.js";

export const NoTasks = () => {
  const { taskType } = React.useContext(hookContext);
 return (
  <>{ taskType === "todo"  
    ? <h2 className="h2">All Tasks are Complete!</h2>
    : <h2 className="h2">Nothing to shop for?</h2>
    }
    <h6>You can change that by adding to your list</h6>
  </>);
}