import React from "react"
import { hookContext } from "../../App"
import axios from "axios";
import vals from '../../routing_info.js'

export const AppNav = () => {
  const {setTaskType, session} = React.useContext(hookContext);
  const [lists, setLists] = React.useState([]);
  const handleChange = (evt) => {
    console.log(evt.target.value)
    setTaskType(evt.target.value);
  }
  React.useEffect(()=>{
    (async() => {
      const config = {
        headers: {
          'Authorization': `Bearer ${session}`
        }
      }
      const {data} = await axios.get(`${vals.root}/api/userlists`, config);
      setLists(data);
    })();
  },[session])
  return (
    <select className={"navSelect"} onChange={handleChange}>
      <ListOption item={""} key={0} />
      {lists.map((item,index)=><ListOption item={item} key={index +1} />)}
    </select>
  )
}

const ListOption = ({item, index}) => <option value={item} className={"navOption"}>{item}</option> 