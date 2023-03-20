import React from "react"
import { hookContext } from "../../App"

export const AppNav = () => {
  const {taskType, setTaskType, setTaskList} = React.useContext(hookContext);
  const handleClear = () => {
    localStorage.setItem(taskType, JSON.stringify([]));
    setTaskList([]);
  }
  return (
    <>
      <input 
        type="button" 
        value={taskType ==="todo" ? "See Grocery List" : "See Task List"}
        onClick={(evt)=> setTaskType(taskType === "todo" ? "grocery" : "todo")}
        className={"navBarButton"} 
      />
      {/* <input
        type="button"
        value={"Clear List"}
        onClick={handleClear}
        className={"navBarButton"}
      /> */}
    </>
  )
}