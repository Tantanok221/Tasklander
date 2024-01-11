import React from "react";
import   DatePicker    from './components/DatePicker/'
import Task from "./components/Task/";
import SignUp from "./components/SignUp/";
import { getSession } from "./helper/getSession.js"
import Login from "./components/Login/Login.jsx";
function App() {
  const [globalDate,setGlobalDate] = React.useState(new Date())
  const {data,error} = getSession()
  console.log(data)
  return (
    <div>
      {/* <Task/> */}
      <DatePicker globalDate={globalDate} setGlobalDate={setGlobalDate} />
    </div>
  )
}

export default App
