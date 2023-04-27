import React from "react"
import { hookContext } from "../../App"
import axios from "axios";
import vals from '../../routing_info.js'

export const AppNav = () => {
  const { setTaskType, session } = React.useContext(hookContext);
  const [lists, setLists] = React.useState([]);
  const handleChange = (evt) => {
    setTaskType(evt.target.value || "");
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
      <input
        type={"button"}
        value={"Create New List"}
        className={"navBarButton"}
        onClick={handleNewList}
      />
      <select className={"navSelect"} onChange={handleChange}>
        <option value={""} key={0} >Select a List...</option>
        {lists.map((item, index) => <ListOption item={item} key={index + 1} />)}
      </select>
    </>
  )
}

const ListOption = ({ item, index }) => <option value={item} className={"navOption"}>{item}</option> 