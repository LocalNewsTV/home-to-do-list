import React from "react"
import { hookContext } from "../../App"

export const AppNav = () => {
  const {taskType, setTaskType} = React.useContext(hookContext);
  return (
    <>
      <input 
        type="button" 
        value={taskType ==="todo" ? "See Grocery List" : "See Task List"}
        onClick={(evt)=> setTaskType(taskType === "todo" ? "grocery" : "todo")}
        className={"navBarButton"} />
    </>
  )
}