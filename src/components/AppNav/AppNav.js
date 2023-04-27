import React from "react"
import { hookContext } from "../../App"
import axios from "axios";
import vals from '../../routing_info.js'

export const AppNav = () => {
  const { taskType, setTaskType, session, setTaskList } = React.useContext(hookContext);
  const [lists, setLists] = React.useState([]);
  const handleChange = (evt) => {
    setTaskType(evt.target.value || "");
  }
  const handleDeleteList = async () => {
    const removeList = prompt("List To Delete:")
    if (lists.indexOf(removeList) !== -1) {
      const config = {
        headers: {
          'Authorization': `Bearer ${session}`
        },
        data: {
          "list": removeList
        }
      }
      const response = await axios.delete(`${vals.root}/api/userlists`, config)
      if (response.status === 204) {
        const newList = [...lists];
        newList.splice(newList.indexOf(removeList), 1);
        setLists(newList);
        if (taskType === removeList) {
          setTaskType("");
          setTaskList([]);
        }
      }
    }
  }
  const handleNewList = async () => {
    try {
      const newList = prompt("New List Name:");
      if (newList) {
        const config = {
          headers: {
            'Authorization': `Bearer ${session}`
          }
        }
        const response = await axios.patch(`${vals.root}/api/userlists`, { 'newItem': newList }, config);
        if (response.status === 201) {
          const temp = [...lists];
          temp.push(newList);
          setLists(temp)
          setTaskType(newList);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  React.useEffect(() => {
    (async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${session}`
        }
      }
      const { data } = await axios.get(`${vals.root}/api/userlists`, config);
      setLists(data);
    })();
  }, [session])

  return (
    <>
      <select className={"navSelect"} onChange={handleChange} value={taskType}>
        <option value={""} key={0} >Select a List...</option>
        {lists.map((item, index) => <ListOption item={item} key={index + 1} />)}
      </select>
      <input
        type={"button"}
        value={"Add"}
        className={"navBarButton"}
        onClick={handleNewList}
      />
      <input
        type={"button"}
        value={"Remove"}
        className={"navBarButton"}
        onClick={handleDeleteList}
      />

    </>
  )
}

const ListOption = ({ item, index }) => <option value={item} className={"navOption"}>{item}</option> 