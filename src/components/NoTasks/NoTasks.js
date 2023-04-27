import React from 'react';
import {hookContext} from "../../App.js";

export const NoTasks = () => {
  const { taskType } = React.useContext(hookContext);
 return (<>
    { taskType ? 
            <>
              <h1 className="h1">All Tasks are Complete</h1>
              <p>You can change that by adding to your {taskType} list</p>
            </>
          : <>
              <h1 className="h1">No list selected</h1>
              <p>Select or create a list to get started</p>
            </>
      }
        </>
        )



  // <>{ taskType === "todo"  
  //   ? <h1 className="h1">All Tasks are Complete!</h1>
  //   : <h1 className="h1">Nothing to shop for?</h1>
  //   }
  //   <h6>You can change that by adding to your list</h6>
  // </>);
}